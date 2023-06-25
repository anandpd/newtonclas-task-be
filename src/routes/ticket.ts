import { Router } from 'express';
import { ticketController } from '../controllers';
import { VerifyAuth } from '../middlewares/auth';
import { ticketIdValidation, ticketIdUpdateValidation, createTicketValidation, getAnalyticsValidation } from '../validations/ticket';
import { CONSTANT } from '../utils/constant';
const router = Router();

/**
 * Read
 */
router.get("/", VerifyAuth(CONSTANT.ROLE.ADMIN), ticketController.getAllTickets);
router.get("/:id", VerifyAuth(), ticketIdValidation, ticketController.getTicketByPK);

/**
 * Create
 */
router.post("/", VerifyAuth(CONSTANT.ROLE.ADMIN), createTicketValidation, ticketController.createTicket);

/**
 * Update
 */
router.put("/:id", VerifyAuth(CONSTANT.ROLE.ADMIN), ticketIdUpdateValidation, ticketController.updateTicketByPK);

/**
 * Delete
 */
router.delete("/:id", VerifyAuth(CONSTANT.ROLE.ADMIN), ticketIdValidation, ticketController.deleteTicketByPK);


export default router;