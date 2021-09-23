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
  postalCode?: number;
  orders: {};
  balance: number;
  workHours: {};
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
      postalCode,
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
        !postalCode ||
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
        !postalCode ||
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
      postalCode,
      orders: orders || {},
      workHours: workHours || {},
    });

    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({ error: ` wrong request method!` });
  }
};
