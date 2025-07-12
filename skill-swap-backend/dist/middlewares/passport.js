"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const User_1 = __importDefault(require("../models/User"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_github2_1 = require("passport-github2");
passport.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(jwt_payload.id);
        if (user)
            return done(null, user);
        return done(null, false);
    }
    catch (err) {
        return done(err, false);
    }
})));
// Google OAuth Strategy
passport.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = profile.emails && profile.emails[0].value;
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            user = yield User_1.default.create({
                name: profile.displayName,
                email,
                password: '',
                profilePhoto: profile.photos && ((_a = profile.photos[0]) === null || _a === void 0 ? void 0 : _a.value),
                isPublic: true,
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, undefined);
    }
})));
// GitHub OAuth Strategy
passport.use(new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = profile.emails && profile.emails[0].value;
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            user = yield User_1.default.create({
                name: profile.displayName || profile.username,
                email,
                password: '',
                profilePhoto: profile.photos && ((_a = profile.photos[0]) === null || _a === void 0 ? void 0 : _a.value),
                isPublic: true,
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, undefined);
    }
})));
exports.default = passport;
