import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authHandler } from "../utils";

/**
 * User
 * @typedef {object} User
 * @property {number} id - Id
 * @property {string} email - Email of the user
 * @property {number} password - Password of the user
 * @property {string} firstName - First name of the user
 * @property {string} lastName - Last name of the user
 * @property {boolean} isAdmin - Is the user an admin
 */

/**
 * User input
 * @typedef {object} UserInput
 * @property {string} email - Email of the user
 * @property {string} password - Password of the user
 * @property {string} firstName - First name of the user
 * @property {string} lastName - Last name of the user
 * @property {boolean} isAdmin - Is the user an admin
 */

/**
 * Response with one user
 * @typedef {object} OneUser
 * @property {User} data - Response sent by the server
 */

/**
 * Token
 * @typedef {object} Token
 * @property {string} token - Token sent by the server
 */

/**
 * Response with a token
 * @typedef {object} TokenResponse
 * @property {Token} data - Response sent by the server
 */

/**
 * Response with multiple users
 * @typedef {object} MultipleUser
 * @property {array<User>} data - Response sent by the server
 */

/**
 * Login
 * @typedef {object} Login
 * @property {string} email - Email of the user
 * @property {string} password - Password of the user
 */

const router = Router();

/**
 * GET /api/users/
 * @summary Get all users
 * @tags User
 * @security Bearer
 * @return {MultipleUser} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/", authHandler, UserController.findAll);

/**
 * GET /api/users/me
 * @summary Get the connected user
 * @tags User
 * @security Bearer
 * @return {OneUser} 200 - Success- application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/me", authHandler, UserController.me);

/**
 * GET /api/users/{id}
 * @summary Get one user by id
 * @tags User
 * @security Bearer
 * @param {number} id.path.required - Id of the user
 * @return {OneUser} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/:id", authHandler, UserController.findOne);

/**
 * POST /api/users/
 * @summary Create a user
 * @tags User
 * @param {UserInput} request.body.required - User to create
 * @return {OneUser} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.post("/", UserController.create);

/**
 * PATCH /api/users/{id}
 * @summary Update a user
 * @tags User
 * @security Bearer
 * @param {number} id.path.required - Id of the user
 * @param {UserInput} request.body.required - User to update
 * @return {OneUser} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.patch("/:id", authHandler, UserController.update);

/**
 * DELETE /api/users/{id}
 * @summary Delete a user
 * @tags User
 * @security Bearer
 * @param {number} id.path.required - Id of the user
 * @return {OneUser} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.delete("/:id", authHandler, UserController.remove);

/**
 * POST /api/users/login
 * @summary Login a user
 * @tags User
 * @param {Login} request.body.required - User to login
 * @return {TokenResponse} 200 - Success - application/json
 * @return {Error} 404 - Not found - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.post("/login", UserController.login);

/**
 * GET /api/users/me/applications
 * @summary Get all applications of the connected user
 * @tags User
 * @security Bearer
 * @return {MultipleApplication} 200 - Success - application/json
 * @return {Error} 401 - Unauthorized - application/json
 * @return {Error} 500 - Internal server error - application/json
 */
router.get("/me/applications", authHandler, UserController.findMeApplications);

export default router;