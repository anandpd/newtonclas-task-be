import { Router } from 'express';
import { analyticsController } from '../controllers';
import { VerifyAuth } from '../middlewares/auth';
import { getAnalyticsValidation } from '../validations/ticket';
import { CONSTANT } from '../utils/constant';
const router = Router();


/** 
 * Analytics
 */
// useful link : https://www.timestamp-converter.com/
router.get('/visited', VerifyAuth(CONSTANT.ROLE.ADMIN), getAnalyticsValidation, analyticsController.getCustomerAnalytics);
router.get('/profit', VerifyAuth(CONSTANT.ROLE.ADMIN), getAnalyticsValidation, analyticsController.geProfitAnalytics);


export default router;