import { MongoClient, MongoClientOptions } from 'mongodb';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  appName: "ducsu-election",
};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

// Mongoose connection function
export async function dbConnect() {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  if (!uri) {
    console.warn('MONGODB_URI not defined, skipping database connection');
    return;
  }
  
  try {
    await mongoose.connect(uri, {
      dbName: 'ducsu_election'
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise; 