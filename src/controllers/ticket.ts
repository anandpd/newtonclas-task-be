import { Request, Response } from "express";
import { Ticket } from '../models';
import { HttpResponse } from "../middlewares/http-handlers";
import logger from "../utils/logger";
import { CONSTANT } from "../utils/constant";
import { v4 as uuidv4 } from 'uuid';
import { ITicketAttr } from "../models/Ticket";


export const ticketController = {
    getAllTickets: async (req: Request, res: Response) => {
        try {
            const response = await Ticket.findAll({});
            logger.debug(response);
            return HttpResponse(res, { data: response });
        } catch (error) {
            res.json({
                error: error
            })
        }
    },
    getTicketByPK: async (req: Request, res: Response) => {
        try {
            switch (req.method) {
                case CONSTANT.HTTP_METHODS.GET: {
                    return HttpResponse(res, { message: `${req.method} by id` });
                }
                case CONSTANT.HTTP_METHODS.PUT: {
                    return HttpResponse(res, { message: `${req.method} by id` });
                }
                case CONSTANT.HTTP_METHODS.DELETE: {
                    return HttpResponse(res, { message: `${req.method} by id` });
                }
                default: {
                    return HttpResponse(res, { message: `${req.method} by id` });
                }
            }
        } catch (error) {
            logger.error(JSON.stringify(error));
            res.json({
                error: error
            })
        }
    },
    createTicket: async (req: Request, res: Response) => {
        try {
            let id = uuidv4();
            let createTicketInstance:ITicketAttr = {
                ticketId: id,
                price: req.body.price,
                location: req.body.location,
                seatNum: req.body.seatNum,
                customerId: req.body.customerId,
                movieId: req.body.movieId
            };
            if (req.body.addOns) createTicketInstance.addOns = req.body.addOns;
            const dbRes = await Ticket.create(createTicketInstance);
            return HttpResponse(res, { data: dbRes, statusCode: CONSTANT.HTTP_STATUS.OK, message: `Ticket "${id}" created successfully !` })

        } catch (error: any) {
            logger.error(`Error while creating movie = ${error}`)
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error, success: false })
        }
    },
}