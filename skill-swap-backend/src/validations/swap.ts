import Joi = require('joi');

export const createSwapSchema = Joi.object({
  toUser: Joi.string().required(),
  offeredSkill: Joi.string().required(),
  wantedSkill: Joi.string().required(),
  message: Joi.string().max(500).allow(''),
});

export const updateSwapStatusSchema = Joi.object({
  status: Joi.string().valid('accepted', 'rejected').required(),
}); 