import Joi from 'joi';
import { Request } from 'express'
import { ResponseError } from 'error/response-error';

const validateRequest = (schema: Joi.ObjectSchema<any>, request: Request) => {
    const result = schema.validate(request.body, {
        abortEarly: false,
        allowUnknown: false
    });
    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
}

const validateString = (schema: Joi.StringSchema, data: string) => {
    const result = schema.validate(data);
    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
}

export {
    validateRequest,
    validateString
}