import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';

interface ResponseType {
  message: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const { db } = await connect();

    const response = await db.collection('users').insertOne({
      name: 'Ibrahim',
      age: 33,
    });

    res.status(200).json(response.ops[0]);
  } else {
    const { name } = req.body;

    res.status(400).json({ message: `${name}, wrong request method!` });
  }
};
