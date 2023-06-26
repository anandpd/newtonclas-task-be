import { Router } from 'express';
import { VerifyAuth } from '../middlewares/auth';
import { createMovieValidation, movieIdUpdateValidation, movieIdValidation } from '../validations/movie';
import { movieController } from '../controllers';
import { CONSTANT } from '../utils/constant';
const router = Router();

/** create */
router.post('/', VerifyAuth(CONSTANT.ROLE.ADMIN), createMovieValidation, movieController.createMovie);

/** read */
router.get('/', VerifyAuth(), movieController.getAllMovies);
router.get('/:id', VerifyAuth(), movieController.getMovieByPK);

/** update */
router.put('/:id', VerifyAuth(CONSTANT.ROLE.ADMIN), movieIdUpdateValidation, movieController.updateMovieByPK);

/** delete */
router.delete('/:id', VerifyAuth(CONSTANT.ROLE.ADMIN), movieIdValidation,movieController.deleteMovieByPK);

export default router;