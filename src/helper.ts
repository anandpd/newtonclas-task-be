import { Ticket } from './models';
import { literal, Op } from 'sequelize';
import moment, { Moment } from 'moment';
import { Sequelize } from 'sequelize';
import logger from './utils/logger';
import { AnalyticsTypeEnum } from './interfaces/Analytics.enum';

export const helper = {
    getCustomerAnalyticsAgg: async (fromDate: Date, toDate: Date): Promise<any> => {
        try {
            let data = await Ticket.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: fromDate,
                        [Op.lte]: toDate,
                    }
                },
                attributes: [
                    [literal(`extract(month from "createdAt")`), 'month'],
                    [literal(`count ("ticketId")`), 'totalVisit'],
                ],
                group: [
                    'month'
                ],
                raw: true

            });
            const m = moment(fromDate).month();
            return data;
        } catch (error) {
            throw error;
        }
    },
    getAnalyticsJS: (data: any[], fromDate: Date, toDate: Date): number => {
        data = data.filter(x => {
            return (moment(x.createdAt).toDate() >= moment(fromDate).toDate()) && (moment(x.createdAt).toDate() <= moment(toDate).toDate());
        });
        return data.length;
    },
    getDateRange: (monthIdx: number) => {
        try {
            const startOfMonth = moment().month(monthIdx).startOf('month');
            const endOfMonth = moment().month(monthIdx).endOf('month');
            return { startOfMonth, endOfMonth };
        } catch (error) {
            error;
        }
    },
    getProfitAnalyticsAgg: async (fromDate: Date, toDate: Date): Promise<any> => {
        try {
            const profit = await Ticket.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: moment(fromDate).toDate(),
                        [Op.lte]: toDate
                    }
                },
                attributes: [
                    [literal(`extract(month from "createdAt")`), 'month'],
                    [Sequelize.fn('sum', Sequelize.col('price')), 'totalAmount']
                    // eq = [literal(`sum ("price")`), 'totalAmount']
                ],
                group: [
                    "month"
                ],
                raw: true
            });
            return profit;
        } catch (error) {
            return error;
        }
    },
    mapMonthNames: (data: any[], type: AnalyticsTypeEnum, fromMonth: number, toMonth: number, s: Set<number>, allowNullObjects: boolean = false): any[] => {
        const mapMonthArr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (type == AnalyticsTypeEnum.Customer) {
            if (allowNullObjects) {
                for (let i = fromMonth; i <= toMonth; i++) {
                    if (!s.has(i + 1)) data.push({ month: i + 1, totalVisit: 0 })
                }
                data = data.sort((a, b) => a.month - b.month);
            }
            for (let i = 0; i < data.length; i++) {
                // raw response
                (data[i] as AnalyticsData.ITicketAnalyticsRes).month = mapMonthArr[+(data[i].month) - 1];
                (data[i] as AnalyticsData.ITicketAnalyticsRes).totalVisit = +(data[i] as AnalyticsData.ITicketAnalyticsRes).totalVisit;

            }
            logger.debug(data);
            return data;
        } else {
            // type is profit
            if (allowNullObjects) {
                for (let i = fromMonth; i <= toMonth; i++) {
                    if (!s.has(i + 1)) data.push({ month: i + 1, totalAmount: 0 })
                }
                data = data.sort((a, b) => a.month - b.month);

            }
            for (let i = 0; i < data.length; i++) {
                if (data[i].month) {
                    data[i].month = mapMonthArr[+data[i].month - 1];
                }
            }
            return data;
        }
    }
}