import { Request, Response } from "express";
import { Customer, Movie, Ticket } from '../models';
import { HttpResponse } from "../middlewares/http-handlers";
import logger from "../utils/logger";
import { CONSTANT } from "../utils/constant";
import { Op, Sequelize, literal } from 'sequelize';
import db from '../utils/db/connection';
import moment, { Moment } from 'moment';
import { helper } from "../helper";


export const analyticsController = {
    getCustomerAnalytics: async (req: Request, res: Response) => {
        try {
            const { method } = req.query;
            const { fromDate, toDate } = req.body;
            const fromMonth = moment(fromDate).month();
            const toMonth = moment(toDate).month();

            // no. of tickets sold is the count of people
            if (method == CONSTANT.QUERY_METHOD.JS) {
                let analyticsJsRes: Array<AnalyticsData.IAnalyticsRes> = [];
                let allTickets = await Ticket.findAll({
                    where: {},
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    raw: true
                });
                let totalCount: number = 0;
                if (fromMonth == toMonth) {
                    totalCount = helper.getAnalyticsJS(allTickets, fromDate, toDate);
                    analyticsJsRes.push({
                        month: fromMonth + 1, // 1 idx
                        totalVisit: totalCount
                    });
                } else {
                    let currMonth = moment(fromDate).month();
                    let monthDateRange;
                    for (let i = currMonth; i <= toMonth; i++) {
                        if (i == currMonth) {
                            monthDateRange = helper.getDateRange(i);
                            totalCount = helper.getAnalyticsJS(allTickets, moment(fromDate).toDate(), moment(monthDateRange?.endOfMonth).toDate());
                            analyticsJsRes.push({
                                month: i + 1,
                                totalVisit: totalCount
                            });
                        } else if (i == toMonth) {
                            monthDateRange = helper.getDateRange(i);
                            totalCount = helper.getAnalyticsJS(allTickets, moment(monthDateRange?.startOfMonth).toDate(), moment(toDate).toDate());
                            analyticsJsRes.push({
                                month: i + 1,
                                totalVisit: totalCount
                            });
                        } else {
                            monthDateRange = helper.getDateRange(i);
                            totalCount = helper.getAnalyticsJS(allTickets, moment(monthDateRange?.startOfMonth).toDate(), moment(monthDateRange?.endOfMonth).toDate());
                            analyticsJsRes.push({
                                month: i + 1,
                                totalVisit: totalCount
                            });
                        }
                    }
                }

                analyticsJsRes = helper.mapMonthNames(analyticsJsRes);
                return HttpResponse(res, { data: analyticsJsRes, message: `Got ${analyticsJsRes.length} month results from ${moment(fromDate).format('MM/DD/YYYY')} to ${moment(toDate).format('MM/DD/YYYY')} using javascript !` });
            } else {
                let analyticsPromise = [];

                // need data for single month only
                if (fromMonth == toMonth) analyticsPromise.push(helper.getAnalyticsDataAgg(moment(fromDate).toDate(), moment(toDate).toDate()));
                else {
                    let currMonth = moment(fromDate).month();
                    let monthStartDate: Moment | undefined;
                    let monthEndDate: Moment | undefined;
                    let monthDateRange: any
                    for (let i = currMonth; i <= toMonth; i++) {

                        // get first month data (maybe partial)
                        if (i == currMonth) {
                            monthDateRange = helper.getDateRange(i);
                            monthStartDate = moment(fromDate);
                            monthEndDate = monthDateRange?.endOfMonth;
                            analyticsPromise.push(helper.getAnalyticsDataAgg(moment(monthStartDate).toDate(), moment(monthEndDate).toDate()))
                        }
                        // get first last data (maybe partial)
                        else if (i == toMonth) {
                            monthDateRange = helper.getDateRange(i);
                            monthStartDate = monthDateRange?.startOfMonth;
                            monthEndDate = moment(toDate);
                            analyticsPromise.push(helper.getAnalyticsDataAgg(moment(monthStartDate).toDate(), moment(monthEndDate).toDate()))
                        }
                        // get full month data
                        else {
                            monthDateRange = helper.getDateRange(i);
                            monthStartDate = monthDateRange?.startOfMonth;
                            monthEndDate = monthDateRange?.endOfMonth;
                            analyticsPromise.push(helper.getAnalyticsDataAgg(moment(monthStartDate).toDate(), moment(monthEndDate).toDate()));
                        }
                    }
                }

                let data: AnalyticsData.IAnalyticsRes[] = await Promise.all(analyticsPromise);
                data = helper.mapMonthNames(data);
                return HttpResponse(res, { data: data, message: `Got ${data.length} month results from ${moment(fromDate).format('MM/DD/YYYY')} to ${moment(toDate).format('MM/DD/YYYY')} using aggregation()` });
            }
        } catch (error: any) {
            logger.error(`Error in getting analytics = ${error}`)
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error, success: false })
        }
    },
    geProfitAnalytics: async (req: Request, res: Response) => {
        try {
            const { fromDate, toDate } = req.body;
            const amountAnalyticsAgg = await Ticket.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: fromDate,
                        [Op.lte]: toDate
                    }
                },
                attributes: [
                    [literal(`extract(month from "createdAt")`), 'month'],
                    [Sequelize.fn('sum', Sequelize.col('price')), 'totalAmount']
                ],
                group: [
                    "month"
                ]
            });
            return HttpResponse(res, { data: amountAnalyticsAgg })
        } catch (error) {
            throw error;
        }
    }
}