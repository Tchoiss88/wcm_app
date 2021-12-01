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
    const { db } = await connect();

    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: ` Missing Id on request body` });
      return;
    }

    const response = await db.collection('items').findOne({
      _id: new ObjectId(id),
    });

    if (!response) {
      res.status(400).json({ error: `The item with ID=${id} was not found` });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
    return;
  }
};
