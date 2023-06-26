import { Request, Response } from "express";
import { HttpResponse } from "../middlewares/http-handlers";
import { CONSTANT } from "../utils/constant";
import { v4 as uuidv4 } from 'uuid';
import { Movie } from '../models';
import logger from "../utils/logger";

export const movieController = {
    createMovie: async (req: Request, res: Response) => {
        try {
            let id = uuidv4();
            const isExist = await Movie.findOne({ where: { movieTitle: req.body.movieTitle } });
            if (isExist) {
                return HttpResponse(res, { message: "Movie already exists in db ", success: false, statusCode: CONSTANT.HTTP_STATUS.BAD_REQUEST })
            }
            const dbRes = await Movie.create({
                movieId: id,
                movieTitle: req.body.movieTitle,
                movieTime: req.body.movieTime
            });
            return HttpResponse(res, { data: dbRes, statusCode: CONSTANT.HTTP_STATUS.OK, message: `Movie "${req.body.movieTitle}" created successfully !` })

        } catch (error: any) {
            logger.error(`Error while creating movie = ${error}`)
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    getMovieByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const movie = await Movie.findByPk(id);
            if (movie == null) return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No movie found with id ${id}`, success: true });
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, data: movie, success: true });
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    updateMovieByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const movie = await Movie.findByPk(id);
            if (movie == null) return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No movie found with id ${id}`, success: true });
            movie.set({
                ...req.body
            });
            await movie.save();
            return HttpResponse(res, { data: { ...movie.dataValues } })
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    deleteMovieByPK: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const movie = await Movie.findByPk(id);
            if (movie == null) return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.OK, message: `No movie found with id ${id}`, success: true });
            await movie.destroy();
            return HttpResponse(res, {});
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    },
    getAllMovies: async (req: Request, res: Response) => {
        try {
            const movies = await Movie.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            return HttpResponse(res, { data: movies });
        } catch (error: any) {
            if (error.name == "SequelizeValidationError") {
                error = `SequelizeValidationError: ${error.errors[0].message}`;
            }
            return HttpResponse(res, { statusCode: CONSTANT.HTTP_STATUS.SERVER_ERROR, message: error.message, success: false })
        }
    }
}