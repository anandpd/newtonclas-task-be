import { Router } from 'express';
import { VerifyAuth } from '../middlewares/auth';
import { createCustomerValidation, customerIdValidation } from '../validations/customer';
import { customerController } from '../controllers/customer';
const router = Router();

/** create */
router.post('/', VerifyAuth, createCustomerValidation, customerController.createCustomer);

/** read */
router.get('/', VerifyAuth, customerController.getAllCustomer);
router.get('/:id', VerifyAuth, customerIdValidation, customerController.getCustomerByPK);

/** update */
router.put('/:id', VerifyAuth, customerIdValidation, customerController.updateCustomerByPK);

/** delete */
router.delete('/:id', VerifyAuth, customerIdValidation, customerController.deleteCustomerByPK);

export default router;