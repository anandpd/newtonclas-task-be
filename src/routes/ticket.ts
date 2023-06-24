import { Router } from 'express';
import { ticketController } from '../controllers';
import { VerifyAuth } from '../middlewares/auth';
import { ticketIdValidation, createTicketValidation } from '../validations/ticket';
const router = Router();

/**
 * Read
 */
router.get("/", VerifyAuth, ticketController.getAllTickets);
router.get("/:id", VerifyAuth, ticketIdValidation, ticketController.getTicketByPK);

/**
 * Create
 */
router.post("/", createTicketValidation, ticketController.createTicket);

/**
 * Update
 */
// router.put("/:id", VerifyAuth, ticketIdValidation, ticketController.performCrud);

/**
 * Delete
 */
// router.delete("/:id", VerifyAuth, ticketIdValidation, ticketController.performCrud);


export default router;