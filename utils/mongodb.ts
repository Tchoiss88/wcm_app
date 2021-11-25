import { Collection, MongoClient } from 'mongodb';

interface ConnectType {
  db: Collection;
  client: MongoClient;
}

// connection URI database Name
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const client = new MongoClient(uri, options);

export default async function connect(): Promise<ConnectType> {
  // verify if there is a connection if no establish and verify connection
  if (!client.isConnected()) await client.connect();

  const db = client.db(dbName);

  return { db, client };
}
//
