import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: ` Missing name!` });
      return;
    }

    const { db } = await connect();

    const response = await db.collection('users').insertOne({
      name: 'Ibrahim',
      age: 33,
    });

    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({ error: ` wrong request method!` });
  }
};
