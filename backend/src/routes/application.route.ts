import { Router } from "express";
import ApplicationController from "../controllers/application.controller";
import { authHandler, isAdmin } from "../utils";

/**
 * Application
 * @typedef {object} Application
 * @property {number} id - Id
 * @property {number} idAdvert - ID of the advert
 * @property {string} email - Email of the applicant
 * @property {string} firstName - First name of the applicant
 * @property {string} lastName - Last name of the applicant
 * @property {string} message - Message of the application
 * @property {string} status - Status of the application
 * @property {string} creationDate - Creation date of the application
 * @property {Advert} advert - Advert of the application
 */

/**
 * Application input
 * @typedef {object} ApplicationInput
 * @property {number} idAdvert - ID of the advert
 * @property {string} email - Email of the applicant
 * @property {string} firstName - First name of the applicant
 * @property {string} lastName - Last name of the applicant
 * @property {string} message - Message of the application
 */

/**
 * Response with one application
 * @typedef {object} OneApplication
 * @property {Application} data - Response sent by the server
 */

/**
 * Response with multiple applications
 * @typedef {object} MultipleApplication
 * @property {array<Application>} data - Response sent by the server
 */

const router = Router();

/**
 * GET /api/applications/
 * @summary Get all applications
 * @tags Application
 * @security Bearer
 * @return {MultipleApplication} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/", authHandler, isAdmin, ApplicationController.findAll);

/**
 * GET /api/applications/{id}
 * @summary Get one application by id
 * @tags Application
 * @security Bearer
 * @param {number} id.path.required - Id of the application
 * @return {OneApplication} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/:id", authHandler, ApplicationController.findOne);

/**
 * POST /api/applications/
 * @summary Create an application
 * @tags Application
 * @param {ApplicationInput} request.body.required - Application to create
 * @return {OneApplication} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.post("/", ApplicationController.create);

/**
 * PATCH /api/applications/{id}
 * @summary Update an application
 * @tags Application
 * @security Bearer
 * @param {number} id.path.required - Id of the application
 * @param {ApplicationInput} request.body.required - Application to update
 * @return {OneApplication} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.patch("/:id", authHandler, ApplicationController.update);

/**
 * DELETE /api/applications/{id}
 * @summary Delete an application
 * @tags Application
 * @security Bearer
 * @param {number} id.path.required - Id of the application
 * @return {OneApplication} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.delete("/:id", authHandler, isAdmin, ApplicationController.remove);

/**
 * GET /api/applications/adverts/creator/{id}
 * @summary Get all applications by creator id of adverts
 * @tags Application
 * @security Bearer
 * @param {number} id.path.required - Id of the creator
 * @return {MultipleApplication} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/adverts/creator/:id", authHandler, ApplicationController.findByAdvertCreator);

export default router;