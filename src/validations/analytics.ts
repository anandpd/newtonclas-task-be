import joi from 'joi';
import logger from '../utils/logger';
import { NextFunction, Response } from 'express';
import { HttpResponse } from '../middlewares/http-handlers';
import { CONSTANT } from '../utils/constant';


export const getAnalyticsValidation = (req: any, res: Response, next: NextFunction) => {
    const schemas = [
        {
            schema: joi.object({
                method: joi.string().valid("aggregate", "javascript").required()
            }),
            on: 'query'
        },
        {
            schema: joi.object({
                fromDate: joi.string().isoDate().required(),
                toDate: joi.string().isoDate().required(),
            }),
            on: 'body'
        }
    ];
    schemas.map(s => {
        let { schema, on } = s;
        let { error, value } = schema.validate(req[on], { errors: { wrap: { label: '' } } });
        if (error) {
            logger.error("Error while validating => ", error);
            return HttpResponse(res, {
                statusCode: CONSTANT.HTTP_STATUS.BAD_REQUEST,
                message: error.message,
                success: false
            });
        }
    });
    next();
}