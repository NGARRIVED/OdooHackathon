"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const ratingController_1 = require("../controllers/ratingController");
const validate_1 = __importDefault(require("../middlewares/validate"));
const rating_1 = require("../validations/rating");
const router = (0, express_1.Router)();
router.post('/', passport.authenticate('jwt', { session: false }), (0, validate_1.default)(rating_1.addRatingSchema), ratingController_1.addRating);
router.get('/:id', ratingController_1.getUserRatings);
exports.default = router;
