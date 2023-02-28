import { Router } from "express";
import companyRoute from "./company.route";
import userRoute from "./user.route";
import advertRoute from "./advert.route";
import applicationRoute from "./application.route";
import addressRoute from "./address.route";

/**
 * Error
 * @typedef {object} Error
 * @property {number} status - Error code
 * @property {string} message - Error message
 */

const router = Router();

router.use("/companies", companyRoute);
router.use("/users", userRoute);
router.use("/adverts", advertRoute);
router.use("/addresses", addressRoute);
router.use("/applications", applicationRoute);

export default router;