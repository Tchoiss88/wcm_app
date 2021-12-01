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
  title: string;
  description: string;
  category: string;
  image?: string;
  gender: string;
  price: number;
  quantity: number;
  sizes: [];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    ErrorResponseType | SuccessResponseType | MessageSuccessType
  >
): Promise<void> => {
  if (req.method === 'GET') {
    const { db } = await connect();

    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: ` Missing Id on request body` });
      res.end();
      return;
    }

    const response = await db.collection('items').findOne({
      _id: new ObjectId(id),
    });

    if (!response) {
      res.status(400).json({ error: `The item with ID=${id} was not found` });
      res.end();
      return;
    }

    res.status(200).json(response);
    res.end();
  } else if (req.method === 'DELETE') {
    const session = await getSession({ req });

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

    const response = await db.collection('items').deleteOne({
      _id: new ObjectId(id),
    });

    if (!response) {
      res.status(400).json({ error: `The item with ID=${id} was not found` });
      res.end();
      return;
    }

    res.status(200).json({ message: `Item deleted successfully` });
    res.end();

    //
  } else if (req.method === 'PATCH') {
    const session = await getSession({ req });

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

    const response = await db.collection('items').deleteOne({
      _id: new ObjectId(id),
    });

    if (!response) {
      res.status(400).json({ error: `The item with ID=${id} was not found` });
      res.end();
      return;
    }

    res.status(200).json({ message: `Item deleted successfully` });
    res.end();

    //
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
    res.end();
    return;
  }
};
