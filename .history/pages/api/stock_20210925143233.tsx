import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
  url: string;
  description: string;
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

    // TODO verification if the title exist already
    const bdTitle = await db.collection('stock').findOne({
      title,
    });

    if (title === bdTitle) {
      res
        .status(400)
        .json({ error: ` all ready this title exist in database` });
      return;
    }

    const response = await db.collection('stock').insertOne({
      title,
      rootName,
      items,
    });

    res.status(200).json(response.ops[0]);
    //
  } else if (req.method === 'GET') {
    const { db } = await connect();

    const { title } = req.body;

    if (!title) {
      res.status(400).json({ error: ` Missing title on request body` });
      return;
    }

    const response = await db.collection('stock').findOne({
      title,
    });

    if (!response) {
      res.status(400).json({ error: `Title not found` });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
  }
};
