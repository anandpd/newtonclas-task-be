import { Router } from 'express';
import { analyticsController } from '../controllers';
import { VerifyAuth } from '../middlewares/auth';
import { getAnalyticsValidation } from '../validations/ticket';
const router = Router();


/** 
 * Analytics
 */
// a. How much money was earned by movie between 2 dates with division by
// months example response: [{month: 'September', summaryProfit:
// 8000}, {month: 'October', summaryProfit: 6000}, ...]

// b. How many people visited movie between 2 dates with division by months
// example response: [{month: 'September', summaryVisits: 800},
// {month: 'October', summaryVisits: 600}, ...]

// c. Do the analytics in 2 ways –
// • DB aggregation
// • By using JS algorithms.
// • Define some query param to determine which method are used
// For example, /analytics/visited?method=db-aggregation

// https://www.timestamp-converter.com/
router.get('/visited', VerifyAuth, getAnalyticsValidation, analyticsController.getAnalytics);

export default router;