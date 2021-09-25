import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  emailCreate: string;
  emailModified: object[];
  dateCreated: Date;
  items: object[];
  shipAddress: string;
  ownerName: string;
  ownerPhone: number;
  ownerEmail: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      emailCreate,
      emailModified,
      dateCreated,
      items,
      shipAddress,
      ownerName,
      ownerPhone,
      ownerEmail,
    } = req.body;

    if (
      !emailCreate ||
      !emailModified ||
      !dateCreated ||
      !items ||
      !shipAddress ||
      !ownerName ||
      !ownerPhone ||
      !ownerEmail
    ) {
      res.status(400).json({ error: ` Missing body parameter!` });
      return;
    }

    const { db } = await connect();

    const response = await db.collection('orders').insertOne({
      emailCreate,
      emailModified: emailModified || [],
      dateCreated,
      items,
      shipAddress,
      ownerName,
      ownerPhone,
      ownerEmail,
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

    const response = await db.collection('orders').findOne({
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
