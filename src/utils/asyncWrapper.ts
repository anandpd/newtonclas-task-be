import { NextFunction } from "express";

async function asyncWrapper(fn: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error)
        }
    }
}

export default asyncWrapper;