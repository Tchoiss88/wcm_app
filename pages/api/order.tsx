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
  deliveryEstimatedDate: number;
  orderState: number;
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

    // FIXME
    // if (!session) {
    //   res.status(400).json({ error: ` Please login first!` });
    //   return;
    // }

    const {
      fullName,
      email,
      address,
      cellphone,
      createDate,
      deliveryEstimatedDate,
      orderState,
      orderItems,
      orderSummary,
    }: {
      fullName: string;
      email: string;
      address: string;
      cellphone: number;
      createDate: number;
      deliveryEstimatedDate: number;
      orderState: number;
      orderItems: [];
      orderSummary: {};
    } = req.body;

    if (
      !fullName ||
      !email ||
      !address ||
      !cellphone ||
      !createDate ||
      !deliveryEstimatedDate ||
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
      deliveryEstimatedDate,
      orderState: 0,
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
