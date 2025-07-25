import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validate = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map((d) => d.message),
    });
  }
  next();
};

export default validate; 