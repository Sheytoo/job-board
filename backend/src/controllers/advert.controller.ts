import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { COMPANY_NOT_FOUND } from "./company.controller";
import { USER_NOT_FOUND } from "./user.controller";
import { ADDRESS_NOT_FOUND } from "./address.controller";

const prisma = new PrismaClient();

export const ADVERT_NOT_FOUND = {
    status: 404,
    message: "Advert not found"
};

const AdvertController = {
    findAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let sortBy = req.query.sortBy as any ?? "creationDate";
            let sortOrder = req.query.sortOrder as any ?? "desc";
            let adverts = await prisma.advert.findMany({
                include: {
                    user: true,
                    company: true,
                    address: true
                },
                orderBy: { [sortBy]: sortOrder }
            });
            res.json({ data: adverts });
        } catch (e) {
            next(e)
        } finally {
            prisma.$disconnect();
        }
    },
    findOne: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let advert = await prisma.advert.findUnique({
                where: { id: Number(req.params.id) },
                include: { user: true, company: true }
            });
            if (!advert) throw ADVERT_NOT_FOUND;
            res.json({ data: advert });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let { idCompany, idCreator, idAddress, title, description } = req.body;

            let company = await prisma.company.findUnique({ where: { id: Number(idCompany) } });
            if (!company) throw COMPANY_NOT_FOUND;

            let creator = await prisma.user.findUnique({ where: { id: Number(idCreator) } });
            if (!creator) throw USER_NOT_FOUND;

            let address = await prisma.address.findUnique({ where: { id: Number(idAddress) } });
            if (!address) throw ADDRESS_NOT_FOUND;

            let advert = await prisma.advert.create({
                data: {
                    idCompany: Number(idCompany),
                    idCreator: Number(idCreator),
                    idAddress: Number(idAddress),
                    title,
                    description
                }
            });
            res.json({ data: advert });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let { idCompany, idCreator, idAddress, title, description } = req.body;

            if (idCompany) {
                let company = await prisma.company.findUnique({ where: { id: Number(idCompany) } });
                if (!company) throw COMPANY_NOT_FOUND;
            }

            if (idCreator) {
                let creator = await prisma.user.findUnique({ where: { id: Number(idCreator) } });
                if (!creator) throw USER_NOT_FOUND;
            }

            if (idAddress) {
                let address = await prisma.address.findUnique({ where: { id: Number(idAddress) } });
                if (!address) throw ADDRESS_NOT_FOUND;
            }

            let advert = await prisma.advert.update({
                where: { id: Number(req.params.id) },
                data: {
                    idCompany: Number(idCompany) || undefined,
                    idCreator: Number(idCreator) || undefined,
                    idAddress: Number(idAddress) || undefined,
                    title,
                    description
                }
            });
            res.json({ data: advert });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    remove: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let advert = await prisma.advert.findUnique({ where: { id: Number(req.params.id) } });
            if (!advert) throw ADVERT_NOT_FOUND;
            advert = await prisma.advert.delete({ where: { id: Number(req.params.id) } });
            res.json({ data: advert });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    findApplicationsForAdvert: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let advert = await prisma.advert.findUnique({ where: { id: Number(req.params.id) } });
            if (!advert) throw ADVERT_NOT_FOUND;

            let applications = await prisma.application.findMany({ where: { idAdvert: Number(req.params.id) } });
            res.json({ data: applications });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    }
};

export default AdvertController;