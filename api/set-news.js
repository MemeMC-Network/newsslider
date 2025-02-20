import Redis from 'ioredis';

// Create a new Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { newsText } = req.body;

    if (!newsText) {
      return res.status(400).json({ error: 'News text is required' });
    }

    try {
      // Store the news text in Redis
      await redis.set('newsText', newsText);
      return res.status(200).json({ message: 'News updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update news' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
