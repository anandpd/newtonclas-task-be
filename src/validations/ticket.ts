import joi from 'joi';
import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../middlewares/http-handlers';
import { CONSTANT } from '../utils/constant';

export const ticketIdValidation = (req: Request, res: Response, next: NextFunction) => {
    const data = req.params;
    const schema = joi.object({
        id: joi.string().uuid().required()
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

export const createTicketValidation = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const schema = joi.object({
        price: joi.number(),
        location: joi.string().required(),
        seatNum: joi.number().integer().required(),
        addOns: joi.string().optional(),
        customerId: joi.string().required(),
        movieId: joi.string().required()
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

export const ticketIdUpdateValidation = (req: any, res: Response, next: NextFunction) => {
    const schemas = [
        {
            schema: joi.object({
                id: joi.string().guid() // 128 bit uuid
            }),
            on: 'params'
        },
        {
            schema: joi.object({
                ticketId: joi.string().uuid().optional(),
                price: joi.number().optional(),
                location: joi.string().optional(),
                seatNum: joi.number().optional(),
                addOns: joi.string().optional(),
                customerId: joi.string().uuid().optional(),
                movieId: joi.string().uuid().optional()
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