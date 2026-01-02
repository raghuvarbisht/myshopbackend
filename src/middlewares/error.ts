import { Request, Response, NextFunction } from "express";

class CustomError extends Error {

    constructor (public statusCode: number , message: string) {
        super(message) 
        this.statusCode = statusCode;    

    }
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction ) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({message: err.message})
    }
    return res.status(500).json({message: "Internal server error!"});
}

export {CustomError, errorHandler};