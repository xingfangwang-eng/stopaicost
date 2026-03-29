import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss';
import morgan from 'morgan';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const DEMO_MODE = !GROQ_API_KEY || GROQ_API_KEY === 'demo_mode';
const NODE_ENV = process.env.NODE_ENV || 'development';

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://stopaiicost.com',
  'https://www.stopaiicost.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin) || NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    error: 'Too many requests',
    message: 'Please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || req.socket.remoteAddress || 'unknown';
  }
});

const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: {
    error: 'Rate limit exceeded',
    message: 'Please try again in an hour'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.groq.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: {
    action: 'deny'
  },
  xssFilter: true,
  noSniff: true,
  hidePoweredBy: true
}));

app.use(cors(corsOptions));
app.use(express.json({
  limit: '10kb',
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      res.status(400).json({ error: 'Invalid JSON' });
      throw new Error('Invalid JSON');
    }
  }
}));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

if (NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(express.static(__dirname, {
  etag: true,
  lastModified: true,
  maxAge: '1d'
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input;
  }
  return xss(input.trim());
}

function validateTask(task) {
  const errors = [];
  
  if (!task || typeof task !== 'string') {
    errors.push('Task must be a string');
    return { valid: false, errors };
  }
  
  const sanitized = sanitizeInput(task);
  
  if (sanitized.length === 0) {
    errors.push('Task cannot be empty');
  }
  
  if (sanitized.length > 1000) {
    errors.push('Task is too long (max 1000 characters)');
  }
  
  const forbiddenPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /on\w+=/gi,
    /eval\s*\(/gi,
    /document\s*\./gi,
    /window\s*\./gi
  ];
  
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(sanitized)) {
      errors.push('Task contains forbidden content');
      break;
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    sanitized
  };
}

function getDemoCode(task) {
  const scripts = [
    {
      code: `const fs = require('fs');
const csv = require('csv-parser');

const results = [];
const inputFile = 'data.csv';
const outputFile = 'processed_data.json';

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const processed = results.map(item => ({
      ...item,
      timestamp: new Date().toISOString()
    }));
    fs.writeFileSync(outputFile, JSON.stringify(processed, null, 2));
    console.log('Data processed successfully!');
  });`,
      saas_cost: 25,
      our_cost: '0.002',
      logic_explanation: 'This Node.js script runs locally and processes CSV files for free, compared to $25/mo for Zapier\'s CSV automation plan.'
    },
    {
      code: `import requests
import time

def check_website_status(url):
    try:
        response = requests.get(url, timeout=10)
        return response.status_code == 200
    except:
        return False

def main():
    urls = ['https://example.com', 'https://google.com']
    while True:
        for url in urls:
            status = 'UP' if check_website_status(url) else 'DOWN'
            print(f'{url}: {status} at {time.ctime()}')
        time.sleep(60)

if __name__ == '__main__':
    main()`,
      saas_cost: 29,
      our_cost: '0.003',
      logic_explanation: 'This Python script monitors websites locally for free, avoiding the $29/mo cost of UptimeRobot or similar monitoring SaaS.'
    },
    {
      code: `// Simple Twitter/X bot that tweets every hour
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const messages = [
  'Don\\'t forget to take a break! ☕',
  'Time to stretch your legs! 🚶',
  'Stay hydrated! 💧',
  'You\\'re doing great! ✨'
];

async function postTweet() {
  const message = messages[Math.floor(Math.random() * messages.length)];
  await client.v2.tweet(message);
  console.log('Tweet posted:', message);
}

setInterval(postTweet, 60 * 60 * 1000);`,
      saas_cost: 19,
      our_cost: '0.001',
      logic_explanation: 'This Twitter bot runs on your server for free, eliminating the $19/mo fee for Buffer or Hootsuite.'
    }
  ];
  
  return scripts[Math.floor(Math.random() * scripts.length)];
}

async function callGroqAPI(task, apiKey) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const prompt = `You are a code generation assistant that creates simple, efficient scripts.

Task: ${task}

Please respond with a JSON object in the following format:
{
  "code": "The complete, single-file code that solves the task (use JavaScript or Python as appropriate).",
  "saas_cost": 20,
  "our_cost": "0.001",
  "logic_explanation": "One sentence explaining why this solution is cheaper than using a SaaS."
}

Rules:
- code must be a complete, working script
- saas_cost should be a reasonable monthly estimate (e.g., 15-30 USD)
- our_cost should be a small amount, typically less than $0.01, show as a string with 3 decimal places
- logic_explanation should be concise and clear
- Always return valid JSON, no markdown formatting`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2048,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      throw new Error('Groq API request failed');
    }

    const data = await response.json();
    const text = data.choices[0].message.content;

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        return JSON.parse(text);
      }
    } catch (e) {
      return {
        code: `// Generated script for: ${task}
console.log('Task automation script ready!');`,
        saas_cost: 20,
        our_cost: '0.001',
        logic_explanation: 'This script runs locally and only costs you the time to generate it, compared to recurring monthly SaaS fees.'
      };
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.error('Groq API request timed out');
      throw new Error('Request timeout');
    }
    console.error('Groq API error:', error);
    throw error;
  }
}

app.use('/api/', apiLimiter);
app.use('/api/generate', strictLimiter);

app.post('/api/generate', async (req, res) => {
  try {
    const { task } = req.body;

    const validation = validateTask(task);
    
    if (!validation.valid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const { sanitized } = validation;

    let result;

    if (DEMO_MODE) {
      console.log('[DEMO] Generating sample script for:', sanitized.substring(0, 50));
      await new Promise(resolve => setTimeout(resolve, 1500));
      result = getDemoCode(sanitized);
    } else {
      console.log('[API] Calling Groq API for:', sanitized.substring(0, 50));
      result = await callGroqAPI(sanitized, GROQ_API_KEY);
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('[ERROR] /api/generate:', error.message);
    
    const errorResponse = {
      success: false,
      error: 'Failed to generate script'
    };
    
    if (NODE_ENV === 'development') {
      errorResponse.details = error.message;
    }
    
    res.status(500).json(errorResponse);
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use((err, req, res, next) => {
  console.error('[UNHANDLED ERROR]', err);
  
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = NODE_ENV === 'development' 
    ? err.message 
    : 'Internal server error';

  res.status(status).json({
    success: false,
    error: message
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found'
  });
});

export default app;

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                             ║
║   StopAICost Server Started                                 ║
║                                                             ║
║   Environment: ${NODE_ENV.padEnd(40)}║
║   Mode: ${(DEMO_MODE ? 'Demo' : 'Production').padEnd(45)}║
║   URL: http://localhost:${String(PORT).padEnd(38)}║
║                                                             ║
║   Security:                                                 ║
║   • Helmet headers enabled                                  ║
║   • CORS whitelist active                                   ║
║   • Rate limiting enabled                                   ║
║   • Input sanitization active                               ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝
  `);
    
    if (DEMO_MODE) {
      console.log('💡 Demo mode: Set GROQ_API_KEY in .env to use real AI');
    }
  });

  process.on('uncaughtException', (err) => {
    console.error('[UNCAUGHT EXCEPTION]', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('[UNHANDLED REJECTION]', reason);
    process.exit(1);
  });
}
