import { Router } from "express";
import CompanyController from "../controllers/company.controller";
import { authHandler, isAdmin } from "../utils";

/**
 * Company
 * @typedef {object} Company
 * @property {number} id - Id
 * @property {string} name - Name of the company
 * @property {string} logo - Logo of the company
 */

/**
 * Company input
 * @typedef {object} CompanyInput
 * @property {string} name - Name of the company
 * @property {string} logo - Logo of the company
 */

/**
 * Response with one company
 * @typedef {object} OneCompany
 * @property {Company} data - Response sent by the server
 */

/**
 * Response with multiple companies
 * @typedef {object} MultipleCompany
 * @property {array<Company>} data - Response sent by the server
 */

const router = Router();

/**
 * GET /api/companies/
 * @summary Get all companies
 * @tags Company
 * @return {MultipleCompany} 200 - Success - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/", CompanyController.findAll);

/**
 * GET /api/companies/{id}
 * @summary Get one company by id
 * @tags Company
 * @param {number} id.path.required - Id of the company
 * @return {OneCompany} 200 - Success - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/:id", CompanyController.findOne);

/**
 * POST /api/companies/
 * @summary Create a company
 * @tags Company
 * @security Bearer
 * @param {CompanyInput} request.body.required - Company to create
 * @return {OneCompany} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.post("/", authHandler, isAdmin, CompanyController.create);

/**
 * PATCH /api/companies/{id}
 * @summary Update a company
 * @tags Company
 * @security Bearer
 * @param {number} id.path.required - Id of the company
 * @param {CompanyInput} request.body.required - Company to update
 * @return {OneCompany} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.patch("/:id", authHandler, isAdmin, CompanyController.update);

/**
 * DELETE /api/companies/{id}
 * @summary Delete a company
 * @tags Company
 * @security Bearer
 * @param {number} id.path.required - Id of the company
 * @return {OneCompany} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.delete("/:id", authHandler, isAdmin, CompanyController.remove);

export default router;