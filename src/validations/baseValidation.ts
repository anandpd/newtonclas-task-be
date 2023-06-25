import Joi from "joi";
import logger from "../utils/logger";

export const baseValidator = (schema: Joi.Schema, data: any): Joi.ValidationError | void => {
    try {
        const { error, value } = schema.validate(data, { errors: { wrap: { label: '' } } });
        if (error) {
            logger.error(error);
            return error;
        }
    } catch (error: any) {
        return error;
    }
}