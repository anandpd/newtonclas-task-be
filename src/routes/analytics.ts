import { Router } from 'express';
import { analyticsController } from '../controllers';
import { VerifyAuth } from '../middlewares/auth';
import { getAnalyticsValidation } from '../validations/ticket';
const router = Router();


/** 
 * Analytics
 */
// useful link : https://www.timestamp-converter.com/
router.get('/visited', VerifyAuth, getAnalyticsValidation, analyticsController.getCustomerAnalytics);
router.get('/profit', VerifyAuth, getAnalyticsValidation, analyticsController.geProfitAnalytics);


export default router;