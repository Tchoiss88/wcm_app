import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | Record<string, unknown>[]>
): Promise<void> => {
  if (req.method === 'GET') {
    const { db } = await connect();

    const { title } = req.query;

    if (!title) {
      res.status(400).json({ error: ` Missing name on request body` });
      return;
    }

    const response = await db
      .collection('items')
      .find({
        title: { $in: [new RegExp(`${title}`, 'i')] },
      })
      .toArray();

    if (response.length === 0) {
      res.status(400).json({ error: `Name not found` });
      console.log(title, 'inside of the length ');

      return;
    }

    res.status(200).json(response);
    res.end();
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
  }
};
