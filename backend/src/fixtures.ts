import { PrismaClient } from "@prisma/client";
import {
    randAddress,
    randBoolean,
    randBrand,
    randEmail,
    randFirstName,
    randJobTitle,
    randLastName,
    randRecentDate,
    randTextRange
} from "@ngneat/falso";
import * as bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "./app";

const prisma = new PrismaClient();

export default async function () {
    await prisma.application.deleteMany({});
    await prisma.address.deleteMany({});
    await prisma.advert.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.company.deleteMany({});

    for (let i = 0; i < 5; i++) {
        let firstName = randFirstName({ withAccents: false });
        let lastName = randLastName({ withAccents: false });
        let email = randEmail({ firstName: firstName, lastName: lastName, nameSeparator: "." });
        let address = randAddress({ includeCountry: true });
        let brand = randBrand();
        await prisma.application.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                message: randTextRange({ min: 100, max: 200 }),
                status: randBoolean() ? "PENDING" : randBoolean() ? "ACCEPTED" : "REJECTED",
                creationDate: randRecentDate(),
                advert: {
                    create: {
                        title: randJobTitle(),
                        description: randTextRange({ min: 300, max: 600 }),
                        company: {
                            create: {
                                name: brand,
                                logoUrl: `https://logo.clearbit.com/${brand}.com`
                            }
                        },
                        user: {
                            create: {
                                email: email,
                                password: await bcrypt.hash("test", BCRYPT_SALT_ROUNDS),
                                firstName: firstName,
                                lastName: lastName,
                                isAdmin: randBoolean()
                            }
                        },
                        address: {
                            create: {
                                street: address.street,
                                zip: address.zipCode,
                                city: address.city,
                                country: address.country!
                            }
                        }
                    }
                }
            }
        });
    }
}