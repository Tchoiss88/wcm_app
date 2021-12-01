import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  cellphone?: number;
  worker: Boolean;
  address?: string;

  orders: object[];
  balance: number;
  workHours: object[];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      firstName,
      lastName,
      email,
      cellphone,
      worker,
      address,
      orders,
      workHours,
    } = req.body;

    if (!worker) {
      if (
        !firstName ||
        !lastName ||
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
        !firstName ||
        !lastName ||
        !email ||
        !cellphone ||
        !address ||
        !workHours
      ) {
        res.status(400).json({ error: ` Missing body parameter!` });
        return;
      }
    }

    const { db } = await connect();

    const response = await db.collection('users').insertOne({
      firstName,
      lastName,
      email,
      cellphone,
      worker,
      address,
      orders: orders || [],
      workHours: workHours || [],
    });

    res.status(200).json(response.ops[0]);
    //
  } else if (req.method === 'GET') {
    const { db } = await connect();

    const { email } = req.body;

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
