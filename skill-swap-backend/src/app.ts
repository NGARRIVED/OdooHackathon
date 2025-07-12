import express = require('express');
import cors = require('cors');
import dotenv = require('dotenv');
import helmet = require('helmet');
import rateLimit = require('express-rate-limit');
import xss = require('xss-clean');
import mongoSanitize = require('express-mongo-sanitize');
import passport = require('passport');
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import swapRoutes from './routes/swap';
import ratingRoutes from './routes/rating';
import notificationRoutes from './routes/notification';
import errorHandler from './middlewares/errorHandler';
import connectDB from './config/db';
import swaggerUi = require('swagger-ui-express');
import swaggerJSDoc = require('swagger-jsdoc');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(helmet.default());
app.use(rateLimit.default({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(xss());
app.use(mongoSanitize());
app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use(errorHandler);
app.use('/uploads', express.static('uploads'));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Skill Swap Platform API',
      version: '1.0.0',
      description: 'API documentation for the Skill Swap Platform',
    },
    servers: [
      { url: 'http://localhost:5000' },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Skill Swap Platform API is running!');
});

// Test endpoint to check OAuth configuration
app.get('/api/test-oauth', (req, res) => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  
  res.json({
    message: 'OAuth Configuration Test',
    googleClientId: googleClientId ? 'Configured' : 'Missing',
    googleClientSecret: googleClientSecret ? 'Configured' : 'Missing',
    hasGoogleConfig: !!(googleClientId && googleClientSecret)
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
