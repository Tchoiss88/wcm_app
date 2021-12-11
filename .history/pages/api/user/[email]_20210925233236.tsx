import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

interface MessageSuccessType {
  message: string;
}

interface SuccessResponseType {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  cellphone?: number;
  worker: Boolean;
  address?: string;
  orders: Record<string, string[]>;
  work_hours: Record<string, string[]>;
}

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  cellphone?: number;
  worker: Boolean;
  address?: string;
  orders: Record<string, string[]>;
  work_hours: Record<string, string[]>;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    ErrorResponseType | SuccessResponseType | MessageSuccessType
  >
): Promise<void> => {
  if (req.method === 'GET') {
    const { db } = await connect();

    const { email } = req.query;

    if (!email) {
      res.status(400).json({ error: ` Missing email on request body` });
      return;
    }

    const response = await db.collection('users').findOne({
      email,
    });

    if (!response) {
      res.status(400).json({ error: `Email not found` });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
  }
};
