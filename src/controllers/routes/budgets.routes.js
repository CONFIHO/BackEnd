const express = require("express");
const router = express.Router();
const BudgetService = require("../../services/budget.service");

const budgetService = new BudgetService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Budget:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: the user id
 *         consumer_id:
 *           type: integer
 *           description: the consumer id
 *         admin_id:
 *           type: integer
 *           description: the admin id
 *         consumer_nickname:
 *           type: string
 *           description: the consumer nickname
 *         admin_nickname:
 *           type: string
 *           description: the admin nickname
 *         create_at:
 *           type: string
 *           format: time-date
 *           description: budget creation date
 *         status:
 *           type: string
 *           enum:
 *             - PENDIENTE
 *             - VINCULADO
 *             - CANCELADO
 *       required:
 *         - id
 *         - consumer_id
 *         - admin_id
 *         - create_at
 *         - status
 */

/**
 * @swagger
 * /api/budgets/all/{user_id}:
 *   get:
 *     summary: Get budgets list of a user
 *     tags: [Budget]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id
 *     responses:
 *       200:
 *         description: list of budgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Budget'
 */
router.get("/all/:user_id", async (req, res) => {
  res.json(await budgetService.findAll(parseInt(req.params.user_id)));
});

/**
 * @swagger
 * /api/budgets/{budget_id}:
 *   get:
 *     summary: Get a budget
 *     tags: [Budget]
 *     parameters:
 *       - in: path
 *         name: budget_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: budget id to search
 *     responses:
 *       200:
 *         description: budget found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Budget'
 *       404:
 *         description: budget not found
 */
router.get("/:budget_id", async (req, res) => {
  res.json(await budgetService.findOne(parseInt(req.params.budget_id)));
});

/**
 * @swagger
 * /api/budgets/:
 *   post:
 *     summary: Create budget
 *     tags: [Budget]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Budget'
 *     responses:
 *       200:
 *         description: Budget created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Budget'
 */
router.post("/", async (req, res) => {
  res.json(await budgetService.create(req.body));
});

/**
 * @swagger
 * /api/budgets/:
 *   put:
 *     summary: Update budget
 *     tags: [Budget]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Budget'
 *     responses:
 *       200:
 *         description: updated budget
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Budget'
 */
router.put("/", async (req, res) => {
  res.json(await budgetService.update(req.body));
});

/**
 * @swagger
 * /api/budgets/{budget_id}:
 *   delete:
 *     summary: Delete budget
 *     tags: [Budget]
 *     parameters:
 *       - in: path
 *         name: budget_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: budget id to delete
 *     responses:
 *       200:
 *         description: deleted budget
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Budget'
 *       404:
 *         description: budget not found
 */
router.delete("/:id", async (req, res) => {
  res.json(await budgetService.delete(parseInt(req.params.id)));
});

/**
 * @swagger
 * /api/budgets/current/{user_id}:
 *   get:
 *     summary: Get user current budgets
 *     tags: [Budget]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user_id to search budget
 *     responses:
 *       200:
 *         description: list of budgets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Budget'
 *       404:
 *         description: budget not found
 */
router.get("/current/:user_id", async (req, res) => {
  res.json(await budgetService.getBudgets(parseInt(req.params.user_id)));
});

module.exports = router;
