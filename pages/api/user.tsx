import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  fullName: string;
  email: string;
  address: string;
  image?: string;
  gender: string;
  userType: string;
  birthDate: number;
  cellphone: number;
  workHoursWeekly?: number;
  showContact: Boolean;
  orders?: [];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    try {
      const {
        fullName,
        email,
        address,
        image,
        gender,
        userType,
        birthDate,
        cellphone,
        workHoursWeekly,
        showContact,
        orders,
      }: {
        fullName: string;
        email: string;
        address: string;
        image?: string;
        gender: string;
        userType: string;
        birthDate: string;
        cellphone: number;
        workHoursWeekly?: number;
        showContact: Boolean;
        orders?: [];
      } = req.body;

      if (userType === 'client') {
        if (
          !fullName ||
          !email ||
          !address ||
          !gender ||
          !birthDate ||
          !cellphone ||
          !showContact
        ) {
          res
            .status(400)
            .json({ error: ` Missing body parameter on worker account!` });
          return;
        }
        const { db } = await connect();

        const response = await db.collection('users').insertOne({
          fullName,
          email,
          address,
          image: image || '',
          gender,
          userType,
          birthDate,
          cellphone,
          workHoursWeekly: null,
          showContact,
          orders: orders || [],
        });

        res.status(200).json(response.ops[0]);
        res.end();
      }
      if (userType === 'worker') {
        if (
          !fullName ||
          !email ||
          !address ||
          !gender ||
          !birthDate ||
          !cellphone ||
          !workHoursWeekly ||
          !showContact
        ) {
          res
            .status(400)
            .json({ error: ` Missing body parameter on worker account!` });
          return;
        }

        const { db } = await connect();

        const response = await db.collection('users').insertOne({
          fullName,
          email,
          address,
          image: image || '',
          gender,
          userType,
          birthDate,
          cellphone,
          workHoursWeekly,
          showContact,
          orders: [],
        });

        res.status(200).json(response.ops[0]);
        res.end();
      }
    } catch (error) {
      res.status(error).json({ error: ` error in the catch!` });
    }
  } else if (req.method === 'GET') {
    const { db } = await connect();

    const collection = db.collection('users');

    const response = await collection.find({}).toArray();

    if (!response) {
      res.status(400).json({ error: `No users in the database` });
      res.end();
      return;
    }

    res.status(200).json(response);
    res.end();
    return;
    //
  } else {
    res.status(405).json({ error: ` Wrong request method!` });
    res.end();
  }
};
