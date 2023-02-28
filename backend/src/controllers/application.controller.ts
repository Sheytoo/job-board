import { PrismaClient } from "@prisma/client";
import { application, NextFunction, Request, Response } from "express";
import { USER_NOT_FOUND } from "./user.controller";

const prisma = new PrismaClient();

export const APPLICATION_NOT_FOUND = {
    status: 404,
    message: "Application not found"
};

export const ALREADY_APPLIED = {
    status: 409,
    message: "You already applied to this advert"
};

export const CANNOT_APPLY_TO_OWN_ADVERT = {
    status: 409,
    message: "You cannot apply to your own advert"
};

const ApplicationController = {
    findAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let applications = await prisma.application.findMany({ include: { advert: { include: { company: true } } } });
            res.json({ data: applications });
        } catch (e) {
            next(e)
        } finally {
            prisma.$disconnect();
        }
    },
    findOne: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let application = await prisma.application.findUnique({ where: { id: Number(req.params.id) } });
            if (!application) throw APPLICATION_NOT_FOUND;
            res.json({ data: application });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let { idAdvert, email, firstName, lastName, message, status } = req.body;

            let application = await prisma.application.findFirst({
                where: {
                    idAdvert: Number(idAdvert),
                    email: email
                }
            });
            if (application) throw ALREADY_APPLIED;

            let advert = await prisma.advert.findUnique({ where: { id: Number(idAdvert) }, include: { user: true } });
            if (advert && advert.user.email === email) throw CANNOT_APPLY_TO_OWN_ADVERT;

            application = await prisma.application.create({
                data: {
                    idAdvert: Number(idAdvert),
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    message: message,
                    status: status
                }
            });
            res.status(201).json({ data: application });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let { idAdvert, email, firstName, lastName, message, status } = req.body;
            if (idAdvert) {
                let advert = await prisma.application.findUnique({ where: { id: Number(req.params.id) } });
                if (!advert) throw APPLICATION_NOT_FOUND;
            }

            let application = await prisma.application.findUnique({ where: { id: Number(req.params.id) } });
            if (!application) throw APPLICATION_NOT_FOUND;

            application = await prisma.application.update({
                where: { id: Number(req.params.id) },
                data: {
                    idAdvert: Number(idAdvert) || undefined,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    message: message,
                    status: status
                }
            });
            res.json({ data: application });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    remove: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let application = await prisma.application.delete({ where: { id: Number(req.params.id) } });
            if (!application) throw USER_NOT_FOUND;
            res.json({ data: application });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    findByAdvertCreator: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let applications = await prisma.application.findMany({
                where: {
                    advert: {
                        idCreator: Number(req.params.id)
                    }
                },
                include: {
                    advert: {
                        include: {
                            company: true,
                            user: true
                        }
                    },
                }
            });
            res.json({ data: applications });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    }
};

export default ApplicationController;