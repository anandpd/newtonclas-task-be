import { Request, Response } from "express";
import { HttpResponse } from "../middlewares/http-handlers";
import { CONSTANT } from "../utils/constant";
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../models';

export const customerController = {
    createCustomer: async (req: Request, res: Response) => {
        try {
            let id = uuidv4();
            const dbRes = await Customer.create({
                customerId: id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                sex: req.body.sex,
                address: req.body.address
            });
            return HttpResponse(res, { data: dbRes, statusCode: CONSTANT.HTTP_STATUS.OK, message: "Customer created successfully !" })

        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error, success: false })
        }
    },
    getCustomerByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const customer = await Customer.findByPk(id);
            if (customer == null) {
                return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No customer found with id ${id}`, success: true });
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, data: customer, success: true });
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error, success: false })
        }
    },
    updateCustomerByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const customer = await Customer.findByPk(id);
            if (customer == null) {
                return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No customer found with id ${id}`, success: true });
            }
            customer.set({
                ...req.body
            });
            await customer.save();
            return HttpResponse(res, { data: { ...customer.dataValues } })
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error, success: false })
        }
    },
    deleteCustomerByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const customer = await Customer.findByPk(id);
            if (customer == null) {
                return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No customer found with id ${id}`, success: true });
            }
            await customer.destroy();
            return HttpResponse(res, {});
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error, success: false })
        }
    },
    getAllCustomer: async (req: Request, res: Response) => {
        try {
            const customers = await Customer.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            return HttpResponse(res, { data: customers });
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error, success: false })
        }
    }
}