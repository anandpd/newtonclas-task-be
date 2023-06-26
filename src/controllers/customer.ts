import { Request, Response } from "express";
import { HttpResponse } from "../middlewares/http-handlers";
import { CONSTANT } from "../utils/constant";
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../models';
import { ICustomerAttr } from "../models/Customer";
import * as service from '../services'

export const customerController = {
    createCustomer: async (req: Request, res: Response) => {
        try {
            let id = uuidv4();
            const customer: ICustomerAttr = {
                customerId: id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                sex: req.body.sex,
                address: req.body.address,
                email: req.body.email
            }
            if (req.body.createdAt) customer.createdAt = req.body.createdAt;
            const isExist = await service.db.FindOne(Customer, {where: { email: customer.email } });
            if (isExist) return HttpResponse(res, {message: "Customer with this email already exists !"});
            const dbRes = await service.db.Create(Customer, customer);
            return HttpResponse(res, { data: dbRes, statusCode: CONSTANT.HTTP_STATUS.OK, message: "Customer created successfully !" })

        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    getCustomerByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const customer = await service.db.FindByPrimaryKey(Customer,id);
            if (customer == null)  return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No customer found with id ${id}`, success: true });
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, data: customer, success: true });
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    updateCustomerByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            let customer = await service.db.FindByPrimaryKey(Customer,id);
            if (customer == null)  return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No customer found with id ${id}`, success: true });
            // customer.set({
            //     ...req.body
            // });
            // await customer.save();
            customer = await service.db.Update(customer, req.body);
            return HttpResponse(res, { data: { ...customer.dataValues } })
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    deleteCustomerByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const customer = await service.db.FindByPrimaryKey(Customer,id);
            if (customer == null) {
                return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No customer found with id ${id}`, success: true });
            }
            await customer.destroy();
            return HttpResponse(res, {});
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
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
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    }
}