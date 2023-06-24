import { Router } from 'express';
import ticketRoutes from './ticket';
import movieRoutes from './movie';
import customerRoutes from './customer';
const router = Router();

router.use('/ticket', ticketRoutes);
router.use('/movie', movieRoutes);
router.use('/customer', customerRoutes);


export default router;