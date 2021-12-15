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
  fullName: string;
  email: string;
  address: string;
  cellphone: number;
  createDate: number;
  deliveryDate: number;
  orderState: number;
  orderCancellation: Boolean;
  orderItems: [];
  orderSummary: {};
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    ErrorResponseType | SuccessResponseType | MessageSuccessType
  >
): Promise<void> => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (!session) {
      res.status(400).json({ error: ` Please login first!` });
      return;
    }

    const {
      fullName,
      email,
      address,
      cellphone,
      createDate,
      deliveryDate,
      orderState,
      orderCancellation,
      orderItems,
      orderSummary,
    }: {
      fullName: string;
      email: string;
      address: string;
      cellphone: number;
      createDate: number;
      deliveryDate: number;
      orderState: number;
      orderItems: [];
      orderCancellation: Boolean;
      orderSummary: {};
    } = req.body;

    if (
      !fullName ||
      !email ||
      !address ||
      !cellphone ||
      !createDate ||
      !orderItems ||
      !orderSummary
    ) {
      res.status(400).json({ error: ` Missing body parameter!` });
      return;
    }

    const { db } = await connect();

    const order = {
      fullName,
      email,
      address,
      cellphone,
      createDate,
      deliveryDate,
      orderState,
      orderCancellation,
      orderItems,
      orderSummary,
    };

    await db.collection('orders').insertOne(order);
    await db
      .collection('users')
      .updateOne({ email: email }, { $push: { orders: order } });

    res.status(200).json({ message: `Order create successfully` });
    //
  } else if (req.method === 'GET') {
    const { db } = await connect();

    const collection = db.collection('orders');

    const response = await collection.find({}).toArray();

    if (!response) {
      res.status(400).json({ error: `No orders found in the database` });
      res.end();
      return;
    }

    res.status(200).json(response);
    res.end();
    return;
    //
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
    res.end();
    return;
  }
};
