"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const passport = require("passport");
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const swap_1 = __importDefault(require("./routes/swap"));
const rating_1 = __importDefault(require("./routes/rating"));
const notification_1 = __importDefault(require("./routes/notification"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const db_1 = __importDefault(require("./config/db"));
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
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
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
app.use('/api/swaps', swap_1.default);
app.use('/api/ratings', rating_1.default);
app.use('/api/notifications', notification_1.default);
app.use(errorHandler_1.default);
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
(0, db_1.default)();
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
