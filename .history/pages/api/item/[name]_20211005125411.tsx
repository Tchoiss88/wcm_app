import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
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

    res.status(200).json(response;
  } else {
    res.status(400).json({ error: ` Wrong request method!` });
  }
};

// import { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client';
// import connect from '../../../utils/mongodb';
// import { ObjectId } from 'mongodb';

// interface ErrorResponseType {
//   error: string;
// }

// interface MessageSuccessType {
//   message: string;
// }

// interface SuccessResponseType {
//   _id: string;
//   email_create: string;
//   email_modified: Record<string, string[]>;
//   date_created: Date;
//   items: Record<string, unknown[]>;
//   ship_address: string;
//   owner_name: string;
//   owner_cellphone: number;
//   owner_email: string;
// }

// export default async (
//   req: NextApiRequest,
//   res: NextApiResponse<
//     ErrorResponseType | SuccessResponseType | MessageSuccessType
//   >
// ): Promise<void> => {
//   if (req.method === 'GET') {
//     const session = await getSession({ req });

//     if (!session) {
//       res.status(400).json({ error: ` Please login first!` });
//       return;
//     }

//     const { db } = await connect();

//     const { id } = req.query;

//     if (!id) {
//       res.status(400).json({ error: ` Missing Id on request body` });
//       return;
//     }

//     const response = await db.collection('orders').findOne({
//       _id: new ObjectId(id),
//     });

//     if (!response) {
//       res.status(400).json({ error: `The order with ID=${id} was not found` });
//       return;
//     }

//     res.status(200).json(response);
//   } else {
//     res.status(400).json({ error: ` Wrong request method!` });
//     return;
//   }
// };
