import { Db, MongoClient } from 'mongodb';

interface ConnectType {
  db: Db;
  client: MongoClient;
}

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
  if (!client.isConnected()) await client.connect();

  const db = client.db(dbName);
  return { db, client };
}
