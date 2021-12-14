import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import connect from '../../../utils/mongodb';
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
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    ErrorResponseType | SuccessResponseType | MessageSuccessType
  >
): Promise<void> => {
  if (req.method === 'GET') {
    const session = await getSession({ req });

    console.log(session, 'session');

    // TODO:
    // if (!session) {
    //   res.status(400).json({ error: ` Please login first!` });
    //   return;
    // }

    const { db } = await connect();

    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: ` Missing Id on request body` });
      res.end();
      return;
    }

    const response = await db.collection('orders').findOne({
      _id: new ObjectId(id),
    });

    if (!response) {
      res.status(400).json({ error: `The order with ID=${id} was not found` });
      res.end();
      return;
    }

    res.status(200).json(response);
    res.end();
  } else if (req.method === 'DELETE') {
    const { db } = await connect();

    const { id } = req.query;

    const { email } = req.body;

    if (!id) {
      res.status(400).json({ error: ` Missing Id on request body` });
      res.end();
      return;
    }

    await db.collection('orders').deleteOne({
      _id: new ObjectId(id),
    });

    await db
      .collection('users')
      .update(
        { email: email },
        { $pull: { orders: { _id: new ObjectId(id) } } }
      );

    res.status(200).json({ message: `Order deleted successfully` });
    res.end();

    //
  } else if (req.method === 'PATCH') {
    const { db } = await connect();

    const { id } = req.query;

    const { email, orderState } = req.body;

    console.log(email, 'email', orderState, ' orderState');

    if (!id) {
      res.status(400).json({ error: ` Missing Id on request body` });
      res.end();
      return;
    }

    await db.collection('orders').updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { orderState: orderState } }
    );

    res.status(200).json({ message: `Order update successfully` });
    res.end();

    //
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
    res.end();
    return;
  }
};
