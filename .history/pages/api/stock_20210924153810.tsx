import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  title: string;
  rootName: string;
  items: [_id: string, name: string, price: number, url: string, image: string];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const { title, rootName, items } = req.body;

    if (!title || !rootName || !items) {
      res.status(400).json({ error: ` Missing body parameter!` });
      return;
    }

    const { db } = await connect();

    const response = await db.collection('users').insertOne({
      title,
      rootName,
      items,
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
