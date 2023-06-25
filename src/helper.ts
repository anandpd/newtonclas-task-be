import { Ticket } from './models';
import { literal, Op, Sequelize } from 'sequelize';
import moment, { Moment } from 'moment';
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
            return data;
        } catch (error) {
            throw error;
        }
    },
    getAnalyticsJS: (data: any[], fromDate: Date, toDate: Date): number => {
        data = data.filter(x => {
            return (x.createdAt >= fromDate) && (x.createdAt <= toDate);
        });
        return data.length;
    },
    getDateRange: (monthIdx: number):AnalyticsData.IMonthRange  => {
        try {
            const startOfMonth = moment().month(monthIdx).startOf('month');
            const endOfMonth = moment().month(monthIdx).endOf('month');
            return { startOfMonth, endOfMonth };
        } catch (error:any) {
            return error;
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
    getProfitAnalyticsJS: (data: any[], fromDate: Date, toDate: Date): number => {
        try {
            // will filter date;
            data = data.filter(x => {
                return (moment(x.createdAt).toDate() >= fromDate) && (moment(x.createdAt).toDate() <= toDate);
            });
            // return total amount in date range
            let totalAmount = { price: 0 };
            totalAmount = data.reduce((prevVal, currVal) => {
                return { price: prevVal.price + currVal.price }
            }, { price: 0 });
            return totalAmount.price;
        } catch (error: any) {
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
                (data[i] as AnalyticsData.ICustomerAnalytics).month = mapMonthArr[+(data[i].month) - 1];
                (data[i] as AnalyticsData.ICustomerAnalytics).totalVisit = +(data[i] as AnalyticsData.ICustomerAnalytics).totalVisit;

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