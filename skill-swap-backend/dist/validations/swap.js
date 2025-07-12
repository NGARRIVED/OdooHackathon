"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSwapStatusSchema = exports.createSwapSchema = void 0;
const Joi = require("joi");
exports.createSwapSchema = Joi.object({
    toUser: Joi.string().required(),
    offeredSkill: Joi.string().required(),
    wantedSkill: Joi.string().required(),
    message: Joi.string().max(500).allow(''),
});
exports.updateSwapStatusSchema = Joi.object({
    status: Joi.string().valid('accepted', 'rejected').required(),
});
