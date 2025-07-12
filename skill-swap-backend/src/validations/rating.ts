import Joi = require('joi');

export const addRatingSchema = Joi.object({
  user: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  feedback: Joi.string().max(500).allow(''),
}); 