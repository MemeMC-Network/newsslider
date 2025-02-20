const express = require('express');
const Redis = require('ioredis');

// Set up the Redis connection
const redis = new Redis({
  host: 'redis-15333.c325.us-east-1-4.ec2.redns.redis-cloud.com', // Redis host
  port: 15333, // Redis port
  username: 'default', // Redis username (if any)
  password: 'MiSQnX53zlyQ5lOi3yF6ik1v9JnlLlTm', // Redis password
});

// Create an Express app
const app = express();
app.use(express.json()); // To parse JSON bodies

// Endpoint to get the current news
app.get('/news', async (req, res) => {
  try {
    const newsText = await redis.get('newsText');
    if (newsText) {
      res.json({ news: newsText });
    } else {
      res.json({ news: 'No news available. Please submit news on the Text Input page.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Endpoint to submit news
app.post('/news', async (req, res) => {
  try {
    const { newsText } = req.body;
    if (newsText) {
      await redis.set('newsText', newsText); // Save to Redis
      res.json({ message: 'News updated successfully' });
    } else {
      res.status(400).json({ error: 'News text is required' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
