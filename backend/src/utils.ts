import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "./controllers/user.controller";

export function missingHandler(req: Request, res: Response, _next: NextFunction) {
    res.status(404).json({ status: 404, message: "Invalid API route access" });
}

export const BAD_CREDENTIALS = {
    status: 400,
    message: "Invalid credentials"
}

export const NOT_AUTHORIZED = {
    status: 401,
    message: "You are not authorized to access"
}

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
    let response = {
        status: err.status ?? 500,
        message: "Unspecified error"
    }
    response.message = typeof err === "string" ? err : (err.err || err.message || err.msg || err._message) ?? "Unspecified error";
    console.error(err);
    res.status(response.status).json(response);
}

export function authHandler(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) return next(err);
        if (!user) return next(NOT_AUTHORIZED);
        req.user = user;
        next();
    })(req, res, next);
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.user || !(req.user as User).isAdmin) return next(NOT_AUTHORIZED);
    next();
}