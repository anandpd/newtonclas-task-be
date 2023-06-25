import joi from 'joi';
import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../middlewares/http-handlers';
import { CONSTANT } from '../utils/constant';

export const createCustomerValidation = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const schema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        age: joi.number().integer().required(),
        sex: joi.string().required().valid("M", "F", "O"),
        address: joi.string().required(),
        email: joi.string().email().required(),
        createdAt: joi.string().isoDate().optional()

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
export const customerIdUpdateValidation = (req: any, res: Response, next: NextFunction) => {
    const schemas = [
        {
            schema: joi.object({
                id: joi.string().uuid() // 128 bit uuid
            }),
            on: 'params'
        },
        {
            schema: joi.object({
                firstName: joi.string().optional(),
                lastName: joi.string().optional(),
                age: joi.number().integer().optional(),
                sex: joi.string().optional().valid("M", "F", "O"),
                address: joi.string().optional(),
                email: joi.string().email().optional()
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
    })
    next();
}

export const customerIdValidation = (req: any, res: Response, next: NextFunction) => {
    const data = req.params;
    const schema = joi.object({
        id: joi.string().uuid() // 128 bit uuid
    })

    let { error, value } = schema.validate(data, { errors: { wrap: { label: '' } } });
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