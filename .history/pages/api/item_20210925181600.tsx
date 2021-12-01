import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | object[]>
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      category,
      name,
      root_name,
      genders,
      price,
      quantity,
      url,
      image,
      description,
      size,
    } = req.body;

    if (
      !category ||
      !name ||
      !root_name ||
      !genders ||
      !price ||
      !quantity ||
      !description ||
      !size
    ) {
      res.status(400).json({ error: ` Missing body parameter!` });
      return;
    }

    const { db } = await connect();

    const response = await db.collection('items').insertOne({
      category,
      name,
      root_name,
      genders,
      price,
      quantity,
      url: url || null,
      image: image || null,
      description,
      size,
    });

    res.status(200).json(response.ops[0]);
    //
  } else if (req.method === 'GET') {
    const { db } = await connect();

    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: ` Missing name on request body` });
      return;
    }

    const response = await db
      .collection('items')
      .find({
        name,
      })
      .toArray();

    if (response.length === 0) {
      res.status(400).json({ error: `Name not found` });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
  }
};
