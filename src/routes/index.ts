import { Router } from 'express';
import ticketRoutes from './ticket';
import movieRoutes from './movie';
import customerRoutes from './customer';
import analyticsRoutes from './analytics';
const router = Router();

router.use('/ticket', ticketRoutes);
router.use('/movie', movieRoutes);
router.use('/customer', customerRoutes);
router.use('/analytics', analyticsRoutes);


export default router;