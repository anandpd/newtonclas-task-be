import { Router } from 'express';
import { ticketController } from '../controllers';
import { VerifyAuth } from '../middlewares/auth';
import { ticketIdValidation } from '../validations/ticket';
const router = Router();


export default router;