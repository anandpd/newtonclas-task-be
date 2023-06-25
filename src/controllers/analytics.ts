import { Request, Response } from "express";
import { Customer, Movie, Ticket } from '../models';
import { HttpResponse } from "../middlewares/http-handlers";
import logger from "../utils/logger";
import { CONSTANT } from "../utils/constant";
import { Op, Sequelize, literal } from 'sequelize';
import db from '../utils/db/connection';
import moment, { Moment } from 'moment';
import { helper } from "../helper";
import { AnalyticsTypeEnum } from "../interfaces/Analytics.enum";


export const analyticsController = {
    getCustomerAnalytics: async (req: Request, res: Response) => {
        try {
            const { method,allowNullObjects } = req.query;
            const { fromDate, toDate } = req.body;
            const fromMonth = moment(fromDate).month();
            const toMonth = moment(toDate).month();

            // no. of tickets sold is the count of people
            if (method == CONSTANT.QUERY_METHOD.JS) {
                let analyticsJsRes: Array<AnalyticsData.ITicketAnalyticsRes> = [];
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
                    if (totalCount > 0 || allowNullObjects == "true"){
                        analyticsJsRes.push({
                            month: fromMonth + 1, // 1 idx
                            totalVisit: totalCount
                        });
                    }
                } else {
                    let currMonth = moment(fromDate).month();
                    let monthDateRange;
                    for (let i = currMonth; i <= toMonth; i++) {
                        if (i == currMonth) {
                            monthDateRange = helper.getDateRange(i);
                            totalCount = helper.getAnalyticsJS(allTickets, moment(fromDate).toDate(), moment(monthDateRange?.endOfMonth).toDate());
                            if (totalCount > 0 || allowNullObjects == "true") {
                                analyticsJsRes.push({
                                    month: i + 1,
                                    totalVisit: totalCount
                                });
                            }
                        } else if (i == toMonth) {
                            monthDateRange = helper.getDateRange(i);
                            totalCount = helper.getAnalyticsJS(allTickets, moment(monthDateRange?.startOfMonth).toDate(), moment(toDate).toDate());
                            if (totalCount > 0 || allowNullObjects == "true") {
                                analyticsJsRes.push({
                                    month: i + 1,
                                    totalVisit: totalCount
                                });
                            }
                        } else {
                            monthDateRange = helper.getDateRange(i);
                            totalCount = helper.getAnalyticsJS(allTickets, moment(monthDateRange?.startOfMonth).toDate(), moment(monthDateRange?.endOfMonth).toDate());
                            if (totalCount > 0 || allowNullObjects == "true") {
                                analyticsJsRes.push({
                                    month: i + 1,
                                    totalVisit: totalCount
                                });
                            }
                        }
                    }
                }

                analyticsJsRes = helper.mapMonthNames(analyticsJsRes, AnalyticsTypeEnum.Customer, fromDate, toDate, new Set, false);
                return HttpResponse(res, { data: analyticsJsRes, message: `Got ${analyticsJsRes.length} month results from ${moment(fromDate).format('MM/DD/YYYY')} to ${moment(toDate).format('MM/DD/YYYY')} using javascript !` });
            } else {
                // need data for single month only
                let data: AnalyticsData.ITicketAnalyticsRes[] = await helper.getCustomerAnalyticsAgg(moment(fromDate).toDate(), moment(toDate).toDate());
                let allMonthsSet: Set<number> = new Set();
                data.map(x => allMonthsSet.add(+x.month)); // 1 idx
                data = helper.mapMonthNames(data, AnalyticsTypeEnum.Customer, fromMonth, toMonth, allMonthsSet, allowNullObjects == "true");
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
            const {method, allowNullObjects} = req.query;
            let amountAnalyticsAgg: Array<AnalyticsData.ICustomerAnalytics>;
            if (method == CONSTANT.QUERY_METHOD.JS){

            } else {
                amountAnalyticsAgg = await helper.getProfitAnalyticsAgg(moment(fromDate).toDate(), moment(toDate).toDate());
                let allMonthsSet: Set<number> = new Set();
                amountAnalyticsAgg.map(x => allMonthsSet.add(+x.month));
                const fromMonth = moment(fromDate).month();
                const toMonth = moment(toDate).month();
                amountAnalyticsAgg = helper.mapMonthNames(amountAnalyticsAgg, AnalyticsTypeEnum.Profit, fromMonth, toMonth, allMonthsSet, allowNullObjects == "true");
                return HttpResponse(res, { data: amountAnalyticsAgg, message: `Got ${amountAnalyticsAgg.length} month results from ${moment(fromDate).format('DD/MM/YYYY')} to ${moment(toDate).format('DD/MM/YYYY')} using aggregation()` })
            }
        } catch (error: any) {
            logger.error(`Error in getting analytics = ${error}`)
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error, success: false })
        }
    }
}