import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  email_create: string;
  email_modified: object[];
  date_created: Date;
  items: object[];
  ship_address: string;
  owner_name: string;
  owner_cellphone: number;
  owner_email: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      email_create,
      email_modified,
      date_created,
      items,
      ship_address,
      owner_name,
      owner_cellphone,
      owner_email,
    } = req.body;

    if (
      !email_create ||
      !date_created ||
      !items ||
      !ship_address ||
      !owner_name ||
      !owner_cellphone ||
      !owner_email
    ) {
      res.status(400).json({ error: ` Missing body parameter!` });
      return;
    }

    const { db } = await connect();

    const response = await db.collection('orders').insertOne({
      email_create,
      emailModified: email_modified || [],
      date_created,
      items,
      ship_address,
      owner_name,
      owner_cellphone,
      owner_email,
    });

    res.status(200).json(response.ops[0]);
    //
  } else if (req.method === 'GET') {
    const { db } = await connect();

    const { _id } = req.body;

    if (!_id) {
      res.status(400).json({ error: ` Missing Id on request body` });
      return;
    }

    const response = await db.collection('orders').findOne({
      _id,
    });

    if (!response) {
      res.status(400).json({ error: `Id not found` });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
  }
};
