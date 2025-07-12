"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRatingSchema = void 0;
const Joi = require("joi");
exports.addRatingSchema = Joi.object({
    user: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    feedback: Joi.string().max(500).allow(''),
});
