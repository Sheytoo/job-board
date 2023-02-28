import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const COMPANY_NOT_FOUND = {
    status: 404,
    message: "Company not found"
};

const CompanyController = {
    findAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let companies = await prisma.company.findMany();
            res.json({ data: companies });
        } catch (e) {
            next(e)
        } finally {
            prisma.$disconnect();
        }
    },
    findOne: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let company = await prisma.company.findUnique({ where: { id: Number(req.params.id) } });
            if (!company) throw COMPANY_NOT_FOUND;
            res.json({ data: company });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let { name, logoUrl } = req.body;
            let company = await prisma.company.create({ data: { name: name, logoUrl: logoUrl } });
            res.status(201).json({ data: company });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let { name, logoUrl } = req.body;
            let company = await prisma.company.findUnique({ where: { id: Number(req.params.id) } });
            if (!company) throw COMPANY_NOT_FOUND;
            company = await prisma.company.update({
                where: { id: Number(req.params.id) },
                data: { name: name, logoUrl: logoUrl }
            });
            res.json({ data: company });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    remove: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let company = await prisma.company.findUnique({ where: { id: Number(req.params.id) } });
            if (!company) throw COMPANY_NOT_FOUND;
            company = await prisma.company.delete({ where: { id: Number(req.params.id) } });
            res.json({ data: company });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    }
};

export default CompanyController;