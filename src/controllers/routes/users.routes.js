const express = require("express");
const router = express.Router();
const UserService = require("../../services/user.service");

const userService = new UserService();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: the user id
 *         name:
 *           type: string
 *           description: the user name
 *         email:
 *           type: string
 *           description: the user email
 *         password:
 *           type: string
 *           description: the user password
 *         code:
 *           type: string
 *           description: the user code
 *         rol_id:
 *           type: integer
 *           description: rol_id of user
 *       required:
 *         - id
 *         - name
 *         - email
 *         - password
 *         - rol_id
 *       example:
 *         name: Alan Kay
 *         email: alan@test.com
 *         password: abcde12345
 *         rol_id: 3
 */

/**
 * @swagger
 * /api/users/all/{rol_id}:
 *   get:
 *     summary: Get users list with a rol id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: rol_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user rol id
 *     responses:
 *       200:
 *         description: list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/all/:rol_id", async (req, res) => {
  res.json(await userService.findAll(parseInt(req.params.rol_id)));
});

/**
 * @swagger
 * /api/users/{user_id}:
 *   get:
 *     summary: Get a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id to search
 *     responses:
 *       200:
 *         description: user found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user not found
 */
router.get("/:user_id", async (req, res) => {
  res.json(await userService.findOne(parseInt(req.params.user_id)));
});

/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Create user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: user created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 */
router.post("/", async (req, res) => {
  res.json(await userService.create(req.body));
});

/**
 * @swagger
 * /api/users/:
 *   put:
 *     summary: Update user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 */
router.put("/", async (req, res) => {
  res.json(await userService.update(req.body));
});

/**
 * @swagger
 * /api/users/{user_id}:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id to delete
 *     responses:
 *       200:
 *         description: deleted user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user not found
 */
router.delete("/:id", async (req, res) => {
  res.json(await userService.delete(parseInt(req.params.id)));
});

/**
 * @swagger
 * /api/users/auth/:
 *   post:
 *     summary: Auth an user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: the user email
 *               password:
 *                 type: string
 *                 description: the user password
 *     responses:
 *       200:
 *         description: user found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user not found
 */
router.post("/auth/", async (req, res) => {
  res.json(await userService.auth(req.body));
});

module.exports = router;
