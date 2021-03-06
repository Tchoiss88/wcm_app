import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  fullName: string;
  email: string;
  address: string;
  image: string;
  gender: string;
  userType: string;
  birthDate: number;
  cellphone: number;
  workHoursWeekly: number;
  showContact: Boolean;
  orders: [];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  console.log(req.method, 'req method');

  if (req.method === 'GET') {
    const { email } = req?.query;

    if (email === 'undefined') {
      res.end();
      return;
    }

    if (!email) {
      res.status(400).json({ error: ` Missing email on request body` });
    }

    const { db } = await connect();

    const response = await db.collection('users').findOne({
      email,
    });

    if (!response) {
      res.status(400).json({ error: `User with e-mail ${email} not found` });
      return;
    }

    res.status(200).json(response);
    res.end();
  } else {
    res.status(405).json({ error: ` Wrong request method! els` });
    res.end();
  }
};
