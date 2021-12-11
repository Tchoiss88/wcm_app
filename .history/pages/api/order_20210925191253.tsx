import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  email_create: string;
  email_modified: object[];
  date_created: Date;
  items: object[];
  ship_address: string;
  owner_name: string;
  owner_cellphone: number;
  owner_email: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      email_create,
      email_modified,
      date_created,
      items,
      ship_address,
      owner_name,
      owner_cellphone,
      owner_email,
    } = req.body;

    if (
      !email_create ||
      !date_created ||
      !items ||
      !ship_address ||
      !owner_name ||
      !owner_cellphone ||
      !owner_email
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
    };

    await db.collection('orders').insertOne(order);
    await db.collection('users').updateOne(order);

    res.status(200).json({ error: 'Order create successfully' });
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
  }
};
