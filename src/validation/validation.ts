import Joi from 'joi';
import { ResponseError } from '../error/response-error';

const validate = (schema: Joi.ObjectSchema<any>, request: Request) => {
    const result = schema.validate(request)
    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
}

export {
    validate
}