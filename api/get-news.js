import Redis from 'ioredis';

// Create a new Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get the news text from Redis
      const newsText = await redis.get('newsText');
      
      if (newsText) {
        return res.status(200).json({ news: newsText });
      } else {
        return res.status(200).json({ news: 'No news available. Please submit news on the Text Input page.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch news' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
