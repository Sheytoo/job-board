import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaClient } from "@prisma/client";
import { USER_NOT_FOUND } from "./controllers/user.controller";
import bcrypt from "bcrypt";
import { BAD_CREDENTIALS } from "./utils";

const prisma = new PrismaClient();

export default function () {
    passport.use(new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        algorithms: ["HS256"]
    }, (payload, done) => {
        prisma.user.findUnique({ where: { email: payload.email } }).then(user => {
            if (!user) return done(USER_NOT_FOUND, false);
            bcrypt.compare(payload.password, user.password).then(goodPass => {
                if (!goodPass) return done(BAD_CREDENTIALS, false);
                return done(null, user);
            }).catch(err => done(err, false));
        }).catch(err => done(err, false));
    }));
}