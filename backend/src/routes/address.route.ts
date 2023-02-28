import { Router } from "express";
import AddressController from "../controllers/address.controller";
import { authHandler, isAdmin } from "../utils";

/**
 * Address
 * @typedef {object} Address
 * @property {number} id - Id of the address
 * @property {string} street - Street of the address
 * @property {string} city - City of the address
 * @property {string} zip - Zip of the address
 * @property {string} country - Country of the address
 */

/**
 * Address input
 * @typedef {object} AddressInput
 * @property {string} street - Street of the address
 * @property {string} city - City of the address
 * @property {string} zip - Zip of the address
 * @property {string} country - Country of the address
 */

/**
 * Response with one address
 * @typedef {object} OneAddress
 * @property {Address} data - Response sent by the server
 */

/**
 * Response with multiple addresses
 * @typedef {object} MultipleAddress
 * @property {array<Address>} data - Response sent by the server
 */

const router = Router();

/**
 * GET /api/addresses/
 * @summary Get all addresses
 * @tags Address
 * @return {MultipleAddress} 200 - Success - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/", AddressController.findAll);

/**
 * GET /api/addresses/{id}
 * @summary Get one address
 * @tags Address
 * @param {number} id.path - Id of the address
 * @return {OneAddress} 200 - Success - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/:id", AddressController.findOne);

/**
 * POST /api/addresses/
 * @summary Create one address
 * @tags Address
 * @security Bearer
 * @param {AddressInput} request.body.required - Address to create
 * @return {OneAddress} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.post("/", authHandler, AddressController.create);

/**
 * PATCH /api/addresses/{id}
 * @summary Update one address
 * @tags Address
 * @security Bearer
 * @param {number} id.path.required - Id of the address
 * @param {AddressInput} request.body.required - Address to update
 * @return {OneAddress} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.patch("/:id", authHandler, AddressController.update);

/**
 * DELETE /api/addresses/{id}
 * @summary Delete one address
 * @tags Address
 * @security Bearer
 * @param {number} id.path.required - Id of the address
 * @return {OneAddress} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.delete("/:id", authHandler, isAdmin, AddressController.remove);

export default router;