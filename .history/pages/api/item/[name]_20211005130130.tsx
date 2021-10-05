import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

interface Item {
  _id: string;
  category: string;
  name: string;
  root_name: string;
  genders: string;
  price: number;
  quantity: number;
  url: string;
  description: string;
  size: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | Item>
): Promise<void> => {
  if (req.method === 'GET') {
    const { db } = await connect();

    const { name } = req.query;

    if (!name) {
      res.status(400).json({ error: ` Missing name on request body` });
      return;
    }

    const response = await db
      .collection('items')
      .find({
        name: { $in: [new RegExp(`^${name}`, 'g')] },
      })
      .toArray();

    if (response.length === 0) {
      res.status(400).json({ error: `Name not found` });
      return;
    }

    res.status(200);
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
  }
};
