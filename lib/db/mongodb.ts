import mongoose from 'mongoose';
import dns from 'dns';

// Ensure Google and Cloudflare DNS resolvers are used for resilient MongoDB SRV resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // Ignored in runtimes without setServers
}


const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// Fallback direct hosts for cluster0.omzhahh.mongodb.net if local Windows DNS blocks SRV queries
function getDirectFallbackUri(uri: string): string | null {
  if (uri.includes('cluster0.omzhahh.mongodb.net')) {
    const credsMatch = uri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@/);
    if (credsMatch) {
      const user = credsMatch[1];
      const pass = credsMatch[2];
      return `mongodb://${user}:${pass}@ac-n16qdkb-shard-00-00.omzhahh.mongodb.net:27017,ac-n16qdkb-shard-00-01.omzhahh.mongodb.net:27017,ac-n16qdkb-shard-00-02.omzhahh.mongodb.net:27017/abhi_gifts?ssl=true&replicaSet=atlas-vepnoc-shard-0&authSource=admin&retryWrites=true&w=majority`;
    }
  }
  return null;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI || MONGODB_URI;
  if (!uri) {
    // MongoDB URI not set; fallback in-memory store will be used
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };

    cached.promise = (async () => {
      try {
        const instance = await mongoose.connect(uri, opts);
        console.log('MongoDB Atlas: Successfully connected to database');
        return instance;
      } catch (err: any) {
        // If SRV DNS resolution is blocked by Windows/local ISP, retry with direct replicaSet URI
        if (err.message && err.message.includes('querySrv')) {
          const fallbackUri = getDirectFallbackUri(uri);
          if (fallbackUri) {
            console.log('MongoDB: Retrying with direct replicaSet connection...');
            try {
              const fallbackInstance = await mongoose.connect(fallbackUri, opts);
              console.log('MongoDB Atlas: Connected via direct replicaSet connection');
              return fallbackInstance;
            } catch (fallbackErr: any) {
              console.warn('MongoDB fallback connection error:', fallbackErr.message);
            }
          }
        }
        console.warn('MongoDB connection error, falling back to resilient local store:', err.message);
        cached.promise = null;
        return null;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}
