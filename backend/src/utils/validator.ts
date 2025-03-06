import Joi from "joi";

export const validateSignup = (data: any) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }).validate(data);

export const validateLogin = (data: any) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);

export const validateTask = (data: any, partial = false) => {
  const schema = Joi.object({
    title: Joi.string().max(100).required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().greater(Joi.ref("startTime")).required(),
    priority: Joi.number().integer().min(1).max(5).required(),
    status: Joi.string().valid("pending", "finished").required(),
  });
  return partial
    ? schema.validate(data, { stripUnknown: true })
    : schema.validate(data);
};
