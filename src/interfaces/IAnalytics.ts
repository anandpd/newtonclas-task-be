
declare namespace AnalyticsData {
    interface IAnalyticsRes {
        month: StringOrNum,
        ticketCount: StringOrNum
    }
    interface IAnalyticsData extends IAnalyticsRes {
        dataValues?: any;
    }
    type StringOrNum = string | number;
}
