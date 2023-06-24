import { NextFunction, Request, Response } from "express"
import { CONSTANT } from "../utils/constant"
import logger from "../utils/logger";
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let errMsg: string = "";
    if (typeof err == 'object') {
        if (err.message) errMsg = err.message;
    } else if (typeof err == 'string') {
        errMsg = err;
    } else {
        errMsg = "Something went wrong !"
    }
    return res.status(CONSTANT.HTTP_STATUS.SERVER_ERROR).json({
        success: false,
        message: errMsg,
        data: null
    })
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    return res.status(CONSTANT.HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: `Route not found ${req.url}`,
        data: null
    })
}

export const HttpResponse = (res: Response, data: HttpRequest.IHandleResponse) => {
    return res.status(data.statusCode || 200).json({
        success: typeof data.success != 'undefined' ? data.success : true,
        message: data.message || "Success",
        data: data.data || null
    });

}