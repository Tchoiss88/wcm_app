import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';

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
  if (req.method === 'POST') {
    const {
      first_name,
      last_name,
      email,
      cellphone,
      worker,
      address,
      orders,
      work_hours,
    }: {
      first_name: string;
      last_name: string;
      email: string;
      cellphone?: number;
      worker: Boolean;
      address?: string;
      orders: Record<string, string[]>;
      work_hours: Record<string, string[]>;
    } = req.body;

    if (!worker) {
      if (
        !first_name ||
        !last_name ||
        !email ||
        !cellphone ||
        !address ||
        !orders
      ) {
        res.status(400).json({ error: ` Missing body parameter!` });
        return;
      }
    } else if (worker) {
      if (
        !first_name ||
        !last_name ||
        !email ||
        !cellphone ||
        !address ||
        !work_hours
      ) {
        res.status(400).json({ error: ` Missing body parameter!` });
        return;
      }
    }

    const { db } = await connect();

    const response = await db.collection('users').insertOne({
      first_name,
      last_name,
      email,
      cellphone,
      worker,
      address,
      orders: orders || [],
      work_hours: work_hours || [],
    });

    //TODO change the message
    res.status(200).json(response.ops[0]);
    //
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
  }
};
