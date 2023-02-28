import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import loadFixtures from "./fixtures";
import apiRoute from "./routes/api.route";
import { errorHandler, missingHandler } from "./utils";
import expressJSDocSwagger from "express-jsdoc-swagger";
import swaggerConfig from "./swaggerConfig";
import passportConfig from "./passportConfig";
import passport from "passport";

export const PORT = process.env.APP_PORT ?? 3000;
export const ENABLE_FIXTURES = process.env.LOAD_FIXTURES || false;
export const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUND ?? 10;

passportConfig();

if (ENABLE_FIXTURES) {
    console.log("Loading test data...");
    loadFixtures()
        .then(() => {
            console.log("Test data loading completed!");
        })
        .catch((e) => {
            console.error("Error while loading test data.");
            console.error(e)
            process.exit(1);
        });
}

const app = express();

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

expressJSDocSwagger(app)(<any>swaggerConfig);

app.use("/api", apiRoute, missingHandler, errorHandler);