"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const Joi = require("joi");
exports.registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
