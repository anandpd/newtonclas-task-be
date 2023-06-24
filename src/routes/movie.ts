import { Router } from 'express';
import { VerifyAuth } from '../middlewares/auth';
import { createMovieValidation, movieIdUpdateValidation, movieIdValidation } from '../validations/movie';
import { movieController } from '../controllers';
const router = Router();

/** create */
router.post('/', VerifyAuth, createMovieValidation, movieController.createMovie);

/** read */
router.get('/', VerifyAuth, movieController.getAllMovies);
router.get('/:id', VerifyAuth, movieController.getMovieByPK);

/** update */
router.put('/:id', VerifyAuth, movieIdUpdateValidation, movieController.updateMovieByPK);

/** delete */
router.delete('/:id', VerifyAuth, movieIdValidation,movieController.deleteMovieByPK);

export default router;