import { Ticket } from './models';
import { literal, Op } from 'sequelize';
import moment, { Moment } from 'moment';
import logger from './utils/logger';

export const helper = {
    getAnalyticsDataAgg: async (fromDate: Date, toDate: Date): Promise<any> => {
        try {
            let data = await Ticket.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: fromDate,
                        [Op.lte]: toDate,
                    }
                },
                attributes: [
                    // sequelize.cast(sequelize.col('id'), 'varchar'),
                    [literal(`extract(month from "createdAt")`), 'month'],
                    [literal(`count ("ticketId")`), 'ticketCount'],
                ],
                group: [
                    'month'
                ]


            });
            const m = moment(fromDate).month();
            return data.length > 0 ? data[0] : { month: String(m + 1), ticketCount: "0" };
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
    mapMonthNames: (data: AnalyticsData.IAnalyticsData[]): AnalyticsData.IAnalyticsRes[] => {
        const mapMonthArr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for (let i = 0; i < data.length; i++) {
            console.log("Updating ", data[i]);
            console.log("to val => ", mapMonthArr[+(data[i].month) - 1]);
            if (data[i].dataValues) {
                data[i].dataValues.ticketCount = +data[i].dataValues.ticketCount;
                data[i].dataValues.month = mapMonthArr[+(data[i].dataValues.month) - 1];
            } else {
                data[i].month = mapMonthArr[+(data[i].month) - 1];
                data[i].ticketCount = +data[i].ticketCount;
            }
        }
        logger.debug(data);
        return data;
    }
}