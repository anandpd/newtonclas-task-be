import { Router } from 'express';
import { VerifyAuth } from '../middlewares/auth';
import { createCustomerValidation, customerIdValidation } from '../validations/customer';
import { customerController } from '../controllers/customer';
import { CONSTANT } from '../utils/constant';
const router = Router();

/** create */
router.post('/', VerifyAuth(), createCustomerValidation, customerController.createCustomer);

/** read */
router.get('/', VerifyAuth(CONSTANT.ROLE.ADMIN), customerController.getAllCustomer);
router.get('/:id', VerifyAuth(), customerIdValidation, customerController.getCustomerByPK);

/** update */
router.put('/:id', VerifyAuth(CONSTANT.ROLE.ADMIN), customerIdValidation, customerController.updateCustomerByPK);

/** delete */
router.delete('/:id', VerifyAuth(CONSTANT.ROLE.ADMIN), customerIdValidation, customerController.deleteCustomerByPK);

export default router;