import { NextFunction, Request, Response } from "express";
import { CONSTANT } from "../utils/constant";

export const VerifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.auth;
    if (!auth) return res.status(CONSTANT.HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Auth is required",
        data: null
    });
    if (auth != "Bearer Token") {
        res.status(CONSTANT.HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: "Not Authorized to view this route",
            data: null
        })
    }
    else next();
}