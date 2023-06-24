import { Request, Response } from "express";
import { Ticket } from '../models';
import { HttpResponse } from "../middlewares/http-handlers";
import logger from "../utils/logger";
import { CONSTANT } from "../utils/constant";

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
    performCrud: async (req: Request, res: Response) => {
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
    postTicket: async (req: Request, res: Response) => {
        try {
            
        } catch (error) {
            res.json({
                error: error
            })
        }
    },
}