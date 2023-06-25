
declare namespace AnalyticsData {
    interface ITicketAnalyticsRes {
        month: StringOrNum,
        totalVisit: StringOrNum
    }
    type StringOrNum = string | number;

    interface ICustomerAnalytics {
        month: StringOrNum,
        totalAmount: StringOrNum
    }
}
