import joi from 'joi';
import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../middlewares/http-handlers';
import { CONSTANT } from '../utils/constant';

export const createMovieValidation = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const schema = joi.object({
        movieTitle: joi.string().required().max(75),
        movieTime: joi.number().required()
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

export const movieIdUpdateValidation = (req: any, res: Response, next: NextFunction) => {
    const schemas = [
        {
            schema: joi.object({
                id: joi.string().uuid() // 128 bit uuid
            }),
            on: 'params'
        },
        {
            schema: joi.object({
                movieTitle: joi.string().max(100),
                movieTime: joi.number().integer() // run time
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

export const movieIdValidation = (req: any, res: Response, next: NextFunction) => {
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