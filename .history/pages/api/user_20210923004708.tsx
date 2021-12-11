import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';

interface ResponseType {
  message: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<void> => {
  const { db } = await connect();

  if (req.method === 'POST') {
    const response = await db.collection('users').insertOne({
      name: 'Ibrahim',
      age: 33,
    });
    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({error: });
  }
};
