import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import connect from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

interface ErrorResponseType {
  error: string;
}

interface MessageSuccessType {
  message: string;
}

interface SuccessResponseType {
  _id: string;
  email_create: string;
  email_modified: Record<string, string[]>;
  date_created: Date;
  items: Record<string, unknown[]>;
  ship_address: string;
  owner_name: string;
  owner_cellphone: number;
  owner_email: string;
  status: number;
}

interface Order {
  _id: string;
  email_create: string;
  email_modified: Record<string, string[]>;
  date_created: Date;
  items: Record<string, unknown[]>;
  ship_address: string;
  owner_name: string;
  owner_cellphone: number;
  owner_email: string;
  status: number;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    ErrorResponseType | SuccessResponseType | MessageSuccessType
  >
): Promise<void> => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    //TODO
    if (!session) {
      res.status(400).json({ error: ` Please login first!` });
      return;
    }

    const {
      email_create,
      email_modified,
      date_created,
      items,
      ship_address,
      owner_name,
      owner_cellphone,
      owner_email,
      status,
    }: {
      email_create: string;
      email_modified: Record<string, string[]>;
      date_created: Date;
      items: Record<string, unknown[]>;
      ship_address: string;
      owner_name: string;
      owner_cellphone: number;
      owner_email: string;
      status: number;
    } = req.body;

    if (
      !email_create ||
      !date_created ||
      !items ||
      !ship_address ||
      !owner_name ||
      !owner_cellphone ||
      !owner_email ||
      !status
    ) {
      res.status(400).json({ error: ` Missing body parameter!` });
      return;
    }

    const { db } = await connect();

    const order = {
      email_create,
      emailModified: email_modified || [],
      date_created,
      items,
      ship_address,
      owner_name,
      owner_cellphone,
      owner_email,
      status: 1,
    };

    await db.collection('orders').insertOne(order);
    await db
      .collection('users')
      .updateOne({ email: owner_email }, { $push: { orders: order } });

    res.status(200).json({ message: `Order create successfully` });
    //
  } else if (req.method === 'GET') {
    const { db } = await connect();

    const { id } = req.body;

    if (!id) {
      res.status(400).json({ error: ` Missing Id on request body` });
      return;
    }

    const response = await db.collection('orders').findOne({
      _id: new ObjectId(id),
    });

    if (!response) {
      res.status(400).json({ error: `The order with ID=${id} was not found` });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
    return;
  }
};
