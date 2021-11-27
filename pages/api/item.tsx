import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import connect from '../../utils/mongodb';

interface ErrorResponseType {
  error: string;
}

interface item {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  gender: string;
  price: number;
  quantity: number;
  sizes: [];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | item>
): Promise<void> => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    //TODO
    // if (!session) {
    //   res.status(400).json({ error: ` Please login first!` });
    //   return;
    // }

    const {
      title,
      description,
      category,
      image,
      gender,
      price,
      quantity,
      sizes,
    }: {
      title: string;
      description: string;
      category: string;
      image: string;
      gender: string;
      price: number;
      quantity: number;
      sizes: [];
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !image ||
      !gender ||
      !price ||
      !quantity ||
      !sizes
    ) {
      res.status(400).json({ error: ` Missing body parameter!` });
      return;
    }

    const { db } = await connect();

    const response = await db.collection('items').insertOne({
      title,
      description,
      category,
      image: image || '',
      gender,
      price,
      quantity,
      sizes,
    });

    res.status(200).json(response.ops[0]);
    //
  } else if (req.method === 'GET') {
    const { db } = await connect();

    const response = await db.getCollectionName('items');
    console.log(response, 'hey im here response 001');

    if (!response) {
      res.status(400).json({ error: `No items in the stock` });
      res.end();
      return;
    }

    res.status(200).json(response);
    res.end();
    return;
    //
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
    res.end();
    return;
  }
};
