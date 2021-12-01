import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  category: string;
  name: string;
  rootName: string;
  genders: string;
  price: number;
  quantity: number;
  url?: string;
  image?: any;
  description: string;
  size: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      category,
      name,
      rootName,
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
      !rootName ||
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

    // TODO verification if the title exist already
    const bdTitle = await db.collection('stock').findOne({
      name,
    });

    if (name === bdTitle) {
      res
        .status(400)
        .json({ error: ` all ready this title exist in database` });
      return;
    }

    const response = await db.collection('stock').insertOne({
      category,
      name,
      rootName,
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

    const { category, name, genders, price, quantity, description, size } =
      req.body;

    if (!category || !name) {
      res.status(400).json({ error: ` Missing title on request body` });
      return;
    }

    const response = await db.collection('stock').findOne({
      category,
      name,
      genders,
      price,
      quantity,
      description,
      size,
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
