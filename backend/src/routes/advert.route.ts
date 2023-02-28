import { Router } from "express";
import AdvertController from "../controllers/advert.controller";
import { authHandler } from "../utils";

/**
 * Advert
 * @typedef {object} Advert
 * @property {number} id - Id
 * @property {number} idCompany - ID of the company
 * @property {number} idCreator - ID of the user creator
 * @property {number} idAddress - ID of the address
 * @property {string} title - Title of the advert
 * @property {string} description - Description of the advert
 * @property {Company} company - Company of the advert
 * @property {User} creator - User creator
 */

/**
 * Advert input
 * @typedef {object} AdvertInput
 * @property {number} idCompany - ID of the company
 * @property {number} idCreator - ID of the user creator
 * @property {number} idAddress - ID of the address
 * @property {string} title - Title of the advert
 * @property {string} description - Description of the advert
 */

/**
 * Response with one advert
 * @typedef {object} OneAdvert
 * @property {Advert} data - The response given by the server
 */

/**
 * Response with multiple adverts
 * @typedef {object} MoreAdvert
 * @property {array<Advert>} data - The response given by the server
 */

const router = Router();

/**
 * GET /api/adverts/
 * @summary Get all adverts
 * @tags Advert
 * @param {string} sortBy.query - Sort by
 * @param {string} sortOrder.query - Sort order
 * @return {MoreAdvert} 200 - Success - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/", AdvertController.findAll);

/**
 * GET /api/adverts/{id}
 * @summary Get one advert by id
 * @tags Advert
 * @param {number} id.path.required - Id of the advert
 * @return {OneAdvert} 200 - Success - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/:id", AdvertController.findOne);

/**
 * POST /api/adverts/
 * @summary Create an advert
 * @tags Advert
 * @security Bearer
 * @param {AdvertInput} request.body.required - Advert to create
 * @return {OneAdvert} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.post("/", authHandler, AdvertController.create);

/**
 * PATCH /api/adverts/{id}
 * @summary Update an advert
 * @tags Advert
 * @security Bearer
 * @param {number} id.path.required - Id of the advert
 * @param {AdvertInput} request.body.required - Advert to update
 * @return {OneAdvert} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.patch("/:id", authHandler, AdvertController.update);

/**
 * DELETE /api/adverts/{id}
 * @summary Delete an advert
 * @tags Advert
 * @security Bearer
 * @param {number} id.path.required - Id of the advert
 * @return {OneAdvert} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.delete("/:id", authHandler, AdvertController.remove);

/**
 * GET /api/adverts/{id}/applications
 * @summary Get all applications of an advert
 * @tags Advert
 * @security Bearer
 * @param {number} id.path.required - Id of the advert
 * @return {MultipleApplication} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/:id/applications", authHandler, AdvertController.findApplicationsForAdvert);

export default router;