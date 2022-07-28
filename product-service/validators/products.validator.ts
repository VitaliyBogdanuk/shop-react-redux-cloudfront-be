import Joi from 'joi';

export const productValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    price: Joi.number().required(),
    count: Joi.number().required(),
});