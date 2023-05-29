const express = require("express");
const router = express.Router();
const ExpenseService = require("../../services/expense.service");

const expenseService = new ExpenseService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: the expense id
 *         description:
 *           type: string
 *           description: the expense description
 *         value:
 *           type: number
 *           description: the cost of expense
 *         file_name:
 *           type: string
 *           description: the name of the evidence file
 *         file_data:
 *           type: string
 *           format: byte
 *           description: the evidence file
 *         expense_date:
 *           type: string
 *           format: date-time
 *           description: expense date
 *         category_id:
 *           type: integer
 *           enum:
 *             - 1
 *             - 2
 *             - 3
 *             - 4
 *             - 5
 *         budget_id:
 *           type: integer 
 *       required:
 *         - id
 *         - description
 *         - value
 *         - expense_date
 *         - category_id
 *         - budget_id
 */

/**
 * @swagger
 * /api/expenses/all/{budget_id}:
 *   get:
 *     summary: Get expenses list of a budget
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: budget_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id
 *     responses:
 *       200:
 *         description: list of Expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 */
router.get("/all/:budget_id", async (req, res) => {
  res.json(await expenseService.findAll(parseInt(req.params.budget_id)));
});

/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     summary: Get a Expense
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: expense id to search
 *     responses:
 *       200:
 *         description: expense found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: expense not found
 */
router.get("/:id", async (req, res) => {
  res.json(await expenseService.findOne(parseInt(req.params.id)));
});

/**
 * @swagger
 * /api/expenses/:
 *   post:
 *     summary: Create expense
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Expense created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Expense'
 */
router.post("/", async (req, res) => {
  res.json(await expenseService.create(req.body));
});

/**
 * @swagger
 * /api/expenses/:
 *   put:
 *     summary: Update Expense
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: updated Expense
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Expense'
 */
router.put("/", async (req, res) => {
  res.json(await expenseService.update(req.body));
});

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete Expense
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Expense id to delete
 *     responses:
 *       200:
 *         description: deleted Expense
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found
 */
router.delete("/:id", async (req, res) => {
  res.json(await expenseService.delete(parseInt(req.params.id)));
});

/**
 * @swagger
 * /api/expenses/consumptionReport:
 *   post:
 *     summary: total consumption report between two dates
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: consumption report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 start_date:
 *                   type: string
 *                   format: date
 *                 end_date:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Expense not found
 */
router.post("/consumptionReport", async (req, res) => {
    res.json(await expenseService.consumptionReport(req.body));
  });

module.exports = router;