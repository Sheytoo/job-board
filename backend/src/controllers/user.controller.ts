import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt, { compare } from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../app";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

export const USER_NOT_FOUND = {
    status: 404,
    message: "Your email is incorrect or you don't have an account yet.",
};

export const MISSING_CREDENTIALS = {
    status: 400,
    message: "The request body lacks the required credentials"
};

export const INCORRECT_PASSWORD = {
    status: 400,
    message: "Your password is incorrect.",
};

const UserController = {
    findAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let users = await prisma.user.findMany({});
            res.json({ data: users });
        } catch (e) {
            next(e)
        } finally {
            prisma.$disconnect();
        }
    },
    findOne: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
            if (!user) throw USER_NOT_FOUND;
            res.json({ data: user });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let { email, password, firstName, lastName, isAdmin } = req.body;
            let hashPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

            let user = await prisma.user.findUnique({ where: { email } });
            if (user) throw { status: 400, message: "An account with this email already exists." };

            user = await prisma.user.create({
                data: {
                    email: email,
                    password: hashPassword,
                    firstName: firstName,
                    lastName: lastName,
                    isAdmin: isAdmin
                }
            });
            res.json({ data: user });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let { email, password, firstName, lastName, isAdmin } = req.body;
            if (password) {
                password = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
            }
            let user = await prisma.user.update({
                where: { id: Number(req.params.id) },
                data: {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    isAdmin: isAdmin
                }
            });
            res.json({ data: user });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    remove: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let user = await prisma.user.delete({ where: { id: Number(req.params.id) } });
            if (!user) throw USER_NOT_FOUND;
            res.json({ data: user });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { email, password } = req.body;
            if (!email || !password) throw MISSING_CREDENTIALS;
            let secret = process.env.JWT_SECRET;
            if (!secret) throw "Missing JWT secret";

            let user = await prisma.user.findUnique({ where: { email: email } });
            if (!user) throw USER_NOT_FOUND;

            let goodPass = await compare(password, user.password);
            if (!goodPass) throw INCORRECT_PASSWORD;

            sign(req.body, secret, {
                expiresIn: "3 hours",
            }, (err: Error | null, token: string | undefined) => {
                if (err) next(err);
                return res.json({ data: { token } });
            });
        } catch (e) {
            next(e);
        } finally {
            await prisma.$disconnect();
        }
    },
    me: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let user = await prisma.user.findUnique({ where: { id: (req.user as User).id } });
            if (!user) throw USER_NOT_FOUND;
            res.json({ data: user });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    findMeApplications: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let user = await prisma.user.findUnique({ where: { id: (req.user as User).id } });
            if (!user) throw USER_NOT_FOUND;
            let applications = await prisma.application.findMany({
                where: { email: user.email },
                include: { advert: { include: { company: true } } }
            });
            res.json({ data: applications });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    }
};

export default UserController;