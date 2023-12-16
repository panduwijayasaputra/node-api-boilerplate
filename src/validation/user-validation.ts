import Joi from 'joi';

const registerUserValidation = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100)
});

const loginUserValidation = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().required();

export { registerUserValidation, loginUserValidation, getUserValidation }