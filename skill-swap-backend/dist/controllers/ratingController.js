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
exports.getUserRatings = exports.addRating = void 0;
const Rating_1 = __importDefault(require("../models/Rating"));
const User_1 = __importDefault(require("../models/User"));
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, rating, feedback } = req.body;
        const rater = req.user._id;
        if (user === rater.toString())
            return res.status(400).json({ message: 'Cannot rate yourself' });
        const newRating = yield Rating_1.default.create({ user, rater, rating, feedback });
        // Update user's average rating
        const ratings = yield Rating_1.default.find({ user });
        const avg = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;
        yield User_1.default.findByIdAndUpdate(user, { rating: avg, numRatings: ratings.length });
        res.status(201).json(newRating);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.addRating = addRating;
const getUserRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.params.id;
        const ratings = yield Rating_1.default.find({ user }).populate('rater', 'name profilePhoto');
        res.json(ratings);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getUserRatings = getUserRatings;
