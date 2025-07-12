"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const authController_1 = require("../controllers/authController");
const validate_1 = __importDefault(require("../middlewares/validate"));
const auth_1 = require("../validations/auth");
const router = (0, express_1.Router)();
// Email/password
router.post('/register', (0, validate_1.default)(auth_1.registerSchema), authController_1.register);
router.post('/login', (0, validate_1.default)(auth_1.loginSchema), authController_1.login);
// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), authController_1.oauthCallback);
// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { session: false }), authController_1.oauthCallback);
exports.default = router;
