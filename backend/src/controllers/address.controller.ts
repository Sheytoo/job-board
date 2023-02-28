import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const ADDRESS_NOT_FOUND = {
    status: 404,
    message: "Address not found"
}

const AddressController = {
    findAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let addresses = await prisma.address.findMany();
            res.json({ data: addresses });
        } catch (e) {
            next(e)
        } finally {
            prisma.$disconnect();
        }
    },
    findOne: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let address = await prisma.address.findUnique({ where: { id: Number(req.params.id) } });
            if (!address) throw ADDRESS_NOT_FOUND;
            res.json({ data: address });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let { street, zip, city, country } = req.body;
            let address = await prisma.address.create({
                data: {
                    street: street,
                    zip: zip,
                    city: city,
                    country: country
                }
            });
            res.status(201).json({ data: address });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let { street, zip, city, country } = req.body;
            let address = await prisma.address.findUnique({ where: { id: Number(req.params.id) } });
            if (!address) throw ADDRESS_NOT_FOUND;
            address = await prisma.address.update({
                where: { id: Number(req.params.id) },
                data: {
                    street: street,
                    zip: zip,
                    city: city,
                    country: country
                }
            });
            res.json({ data: address });
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    },
    remove: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let address = await prisma.address.findUnique({ where: { id: Number(req.params.id) } });
            if (!address) throw ADDRESS_NOT_FOUND;
            await prisma.address.delete({ where: { id: Number(req.params.id) } });
            res.status(204).end();
        } catch (e) {
            next(e);
        } finally {
            prisma.$disconnect();
        }
    }
};

export default AddressController;