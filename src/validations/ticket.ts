import joi from 'joi';
import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../middlewares/http-handlers';
import { CONSTANT } from '../utils/constant';

export const ticketIdValidation = (req: Request, res: Response, next: NextFunction) => {
    const data = req.params;
    const schema = joi.object({
        id: joi.number().integer().required()
    });
    const { error, value } = schema.validate(data, { errors: { wrap: { label: '' } } });
    if (error) {
        logger.error("Error while validating => ", error);
        return HttpResponse(res, {
            statusCode: CONSTANT.HTTP_STATUS.BAD_REQUEST,
            message: error.message,
            success: false
        });
    }
    next();
}