"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProfileVisibilitySchema = exports.updateProfileSchema = void 0;
const Joi = require("joi");
exports.updateProfileSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    location: Joi.string().max(100),
    skillsOffered: Joi.array().items(Joi.string()),
    skillsWanted: Joi.array().items(Joi.string()),
    availability: Joi.string().max(50),
    profilePhoto: Joi.string().uri(),
});
exports.setProfileVisibilitySchema = Joi.object({
    isPublic: Joi.boolean().required(),
});
