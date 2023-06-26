import { Request, Response } from "express";
import { Customer, Movie, Ticket } from '../models';
import { HttpResponse } from "../middlewares/http-handlers";
import logger from "../utils/logger";
import { CONSTANT } from "../utils/constant";
import { v4 as uuidv4 } from 'uuid';
import { ITicketAttr } from "../models/Ticket";
import * as service from '../services';

export const ticketController = {
    getAllTickets: async (req: Request, res: Response) => {
        try {
            const response = await service.db.FindAll(Ticket,{
                where: {},
                include: [
                    {
                        model: Customer,
                        as: "customerDetails",
                        attributes: [
                            "customerId",
                            "firstName",
                            "lastName",
                            "age",
                            "sex"
                        ]
                    },
                    {
                        model: Movie,
                        as: "movieDetails",
                        attributes: [
                            "movieId",
                            "movieTitle",
                            "movieTime"
                        ]
                    }
                ],
                attributes: [
                    "ticketId",
                    "price",
                    "location",
                    "seatNum",
                    "addOns",
                ]
            });
            return HttpResponse(res, { data: response });
        } catch (error: any) {
            logger.error(`Error in getAllTickets() = ${error}`)
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    updateTicketByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            let ticket = await service.db.FindByPrimaryKey(Ticket, id);
            if (ticket == null) return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No ticket found with id ${id}`, success: true });
            ticket = await service.db.Update(Ticket, req.body);
            return HttpResponse(res, { data: { ...ticket.dataValues } })
        } catch (error: any) {
            logger.error(`Error in updateTicketByPK() = ${error}`)
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    createTicket: async (req: Request, res: Response) => {
        try {
            let id = uuidv4();
            let createTicketInstance: ITicketAttr = {
                ticketId: id,
                price: req.body.price,
                location: req.body.location,
                seatNum: req.body.seatNum,
                customerId: req.body.customerId,
                movieId: req.body.movieId
            };
            if (req.body.addOns) createTicketInstance.addOns = req.body.addOns;
            if (req.body.createdAt) createTicketInstance.createdAt = req.body.createdAt;

            let preCheckPromise: Array<Promise<any>> = [
                service.db.FindByPrimaryKey(Customer, createTicketInstance.customerId),
                service.db.FindByPrimaryKey(Customer,createTicketInstance.movieId)
            ];
            preCheckPromise = await Promise.all(preCheckPromise);
            if (preCheckPromise[0] == null) return HttpResponse(res, { success: false, message: "Customer doesnt exists !" });
            else if (preCheckPromise[1] == null) return HttpResponse(res, { success: false, message: "Movie doesnt exists !" });

            const dbRes = await service.db.Create(Ticket, createTicketInstance);
            return HttpResponse(res, { data: dbRes, statusCode: CONSTANT.HTTP_STATUS.OK, message: `Ticket "${id}" created successfully !` })

        } catch (error: any) {
            logger.error(`Error in createTicket() = ${error}`)
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    deleteTicketByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const ticket = await service.db.FindByPrimaryKey(Ticket, id);
            if (ticket == null) return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No ticket found with id ${id}`, success: true });
            await service.db.DeleteByPrimaryKey(Ticket, {
                where: {
                    ticketId: id
                }
            })
            return HttpResponse(res, { data: {} })
        } catch (error: any) {
            logger.error(`Error in deleteTicketByPK() = ${error}`)
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    getTicketByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const ticketByPk = await service.db.FindByPrimaryKey(Ticket, id);
            return HttpResponse(res, { data: ticketByPk });
        } catch (error: any) {
            logger.error(`Error in getTicketByPK() = ${error}`)
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    }
}