import Joi from 'joi';

export const productValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    count: Joi.number().required(),
});