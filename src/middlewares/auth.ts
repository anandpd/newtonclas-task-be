import { NextFunction, Request, Response } from "express";
import { CONSTANT } from "../utils/constant";
import logger from "../utils/logger";

export function VerifyAuth(role: string = CONSTANT.ROLE.USER) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const auth = req.headers.auth;
            if (!auth) return res.status(CONSTANT.HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Auth is required",
                data: null
            });
            if (role == CONSTANT.ROLE.USER) {
                if (auth == CONSTANT.TOKEN_ACCESS.ADMIN) next();
                else if (auth == CONSTANT.TOKEN_ACCESS.USER) next();
                else return res.status(CONSTANT.HTTP_STATUS.UNAUTHORIZED).json({
                    success: false,
                    message: "Not Authorized to perform action on this route",
                    data: null
                });
            }
            if (role == CONSTANT.ROLE.ADMIN && auth == CONSTANT.TOKEN_ACCESS.ADMIN) next();
            else {
                return res.status(CONSTANT.HTTP_STATUS.UNAUTHORIZED).json({
                    success: false,
                    message: "Not Authorized to perform action on this route",
                    data: null
                });
            }
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}