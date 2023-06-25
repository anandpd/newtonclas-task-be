
declare namespace AnalyticsData {
    interface IAnalyticsRes {
        month: StringOrNum,
        totalVisit: StringOrNum
    }
    interface IAnalyticsData extends IAnalyticsRes {
        dataValues?: any;
    }
    type StringOrNum = string | number;
}
