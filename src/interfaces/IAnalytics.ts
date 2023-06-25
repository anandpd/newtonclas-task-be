
declare namespace AnalyticsData {
    interface ICustomerAnalytics {
        month: StringOrNum,
        totalVisit: StringOrNum
    }
    type StringOrNum = string | number;

    interface IProfitAnalytics {
        month: StringOrNum,
        totalAmount: StringOrNum
    }
    interface IMonthRange {
        startOfMonth: moment.Moment,
        endOfMonth: moment.Moment
    }

}