// ahaobrianAI's Backend Server
// This handles all API requests and bypasses CORS issues

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'ahaobrianAI\'s Backend API is running! 🚀',
    endpoints: ['/api/chat', '/api/youtube', '/api/social', '/api/image', '/api/movie', '/api/fun']
  });
});

// ============================================
// AI CHAT ENDPOINT (with fallback)
// ============================================
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Try multiple AI APIs in order
  const apis = [
    {
      name: 'BrainShop',
      url: `https://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=${Date.now()}&msg=${encodeURIComponent(message)}`,
      parse: (data) => data.cnt
    },
    {
      name: 'GPT4-Style',
      url: `https://gpt4.giftedtech.workers.dev/?prompt=${encodeURIComponent(message)}`,
      parse: (data) => data.response || data.result
    },
    {
      name: 'ChatGPT-Alt',
      url: `https://api.maher-zubair.tech/ai/chatgpt4?q=${encodeURIComponent(message)}`,
      parse: (data) => data.result || data.response
    }
  ];

  for (const api of apis) {
    try {
      const response = await axios.get(api.url, { timeout: 10000 });
      const reply = api.parse(response.data);
      
      if (reply) {
        return res.json({ 
          success: true, 
          reply: reply,
          source: api.name 
        });
      }
    } catch (error) {
      console.log(`${api.name} failed, trying next...`);
      continue;
    }
  }

  res.status(500).json({ 
    success: false, 
    error: 'All AI services are currently unavailable. Please try again later.' 
  });
});

// ============================================
// YOUTUBE DOWNLOADER ENDPOINT
// ============================================
app.post('/api/youtube', async (req, res) => {
  const { url, format } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const apis = format === 'mp3' ? [
    `https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(url)}`,
    `https://www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(url)}`,
    `https://api.giftedtech.web.id/api/download/dlmp3?url=${encodeURIComponent(url)}&apikey=gifted-md`,
    `https://api.dreaded.site/api/ytdl/audio?url=${encodeURIComponent(url)}`
  ] : [
    `https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(url)}`,
    `https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(url)}`,
    `https://api.giftedtech.web.id/api/download/dlmp4?url=${encodeURIComponent(url)}&apikey=gifted-md`,
    `https://api.dreaded.site/api/ytdl/video?url=${encodeURIComponent(url)}`
  ];

  for (const apiUrl of apis) {
    try {
      const response = await axios.get(apiUrl, { timeout: 30000 });
      const data = response.data;
      
      if (data.download || data.result || data.url || data.link) {
        return res.json({
          success: true,
          download: data.download || data.result || data.url || data.link,
          title: data.title || 'YouTube Video',
          thumbnail: data.thumbnail || data.thumb,
          format: format
        });
      }
    } catch (error) {
      continue;
    }
  }

  res.status(500).json({ 
    success: false, 
    error: 'Failed to download video. Please check the URL and try again.' 
  });
});

// ============================================
// SOCIAL MEDIA DOWNLOADER ENDPOINT
// ============================================
app.post('/api/social', async (req, res) => {
  const { platform, url } = req.body;
  
  if (!platform || !url) {
    return res.status(400).json({ error: 'Platform and URL are required' });
  }

  try {
    const response = await axios.get(
      `https://bk9.fun/download/${platform}?q=${encodeURIComponent(url)}`,
      { timeout: 30000 }
    );
    
    const data = response.data;
    
    if (data.BK9 && data.BK9.length > 0) {
      return res.json({
        success: true,
        data: data.BK9[0],
        platform: platform
      });
    }
    
    res.status(404).json({ 
      success: false, 
      error: 'No media found at this URL' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Download failed. Please verify the URL is correct.' 
    });
  }
});

// ============================================
// AI IMAGE GENERATOR ENDPOINT
// ============================================
app.post('/api/image', async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.get(
      `https://api.maher-zubair.tech/ai/photoleap?q=${encodeURIComponent(prompt)}`,
      { timeout: 60000 }
    );
    
    const data = response.data;
    
    if (data.status === 200 && data.result) {
      return res.json({
        success: true,
        imageUrl: data.result,
        prompt: prompt
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Image generation failed' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Image generation service unavailable' 
    });
  }
});

// ============================================
// MOVIE DATABASE ENDPOINT
// ============================================
app.get('/api/movie', async (req, res) => {
  const { title } = req.query;
  
  if (!title) {
    return res.status(400).json({ error: 'Movie title is required' });
  }

  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=742b2d09&t=${encodeURIComponent(title)}`
    );
    
    const data = response.data;
    
    if (data.Response === 'True') {
      return res.json({
        success: true,
        movie: data
      });
    }
    
    res.status(404).json({ 
      success: false, 
      error: 'Movie not found' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Movie search failed' 
    });
  }
});

// ============================================
// FUN/ENTERTAINMENT ENDPOINTS
// ============================================

// Get Joke
app.get('/api/fun/joke', async (req, res) => {
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?safe-mode');
    const data = response.data;
    
    res.json({
      success: true,
      joke: data.type === 'single' ? data.joke : `${data.setup} ${data.delivery}`,
      type: data.type,
      setup: data.setup,
      delivery: data.delivery
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch joke' });
  }
});

// Get Quote
app.get('/api/fun/quote', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const data = response.data;
    
    res.json({
      success: true,
      quote: data.content,
      author: data.author
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch quote' });
  }
});

// Get Random Anime
app.get('/api/fun/anime', async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/random/anime');
    const anime = response.data.data;
    
    res.json({
      success: true,
      anime: {
        title: anime.title,
        score: anime.score,
        episodes: anime.episodes,
        type: anime.type,
        synopsis: anime.synopsis,
        image: anime.images.jpg.image_url,
        url: anime.url
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch anime' });
  }
});

// Get Cricket Scores
app.get('/api/fun/cricket', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.cricapi.com/v1/currentMatches?apikey=f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78'
    );
    const data = response.data;
    
    res.json({
      success: true,
      matches: data.data ? data.data.slice(0, 5) : []
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch cricket scores' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong on the server' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ahaobrianAI's Backend running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}`);
});

module.exports = app;
