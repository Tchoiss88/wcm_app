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
  type: Boolean;
  address?: string;
  postalCode?: number;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, cellphone, type, address, postalCode } =
      req.body;

    if (!firstName || !lastName || !email || !type) {
      res.status(400).json({ error: ` Missing name!` });
      return;
    }

    const { db } = await connect();

    const response = await db.collection('users').insertOne({
      firstName,
      lastName,
      email,
      cellphone,
      type,
      address,
      postalCode,
    });

    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({ error: ` wrong request method!` });
  }
};
