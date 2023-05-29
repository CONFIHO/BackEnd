const { PrismaClient } = require("@prisma/client");
const { Budget } = require("../domain/budgets/entities/Budget");
const prisma = new PrismaClient();

class BudgetService {
  async findAll(user_id) {
    try {
      return await prisma.budget.findMany({
        where: { OR: [{ admin_id: user_id }, { consumer_id: user_id }] },
      });
    } catch (e) {
      return e.code;
    }
  }

  async findOne(id) {
    try {
      return await prisma.budget.findFirst({
        where: { id },
      });
    } catch (e) {
      return e.code;
    }
  }

  async create(data) {
    try {
      return await prisma.budget.create({
        data: {
          admin_id: data.admin_id,
          consumer_id: data.consumer_id,
          admin_nickname: data.admin_nickname,
          consumer_nickname: data.consumer_nickname,
        },
      });
    } catch (e) {
      return e.code;
    }
  }

  async update(data) {
    try {
      return await prisma.budget.update({
        where: { id: data.id },
        data: {
          admin_nickname: data.admin_nickname,
          consumer_nickname: data.consumer_nickname,
          status: data.status,
        },
      });
    } catch (e) {
      return e.code;
    }
  }

  async delete(id) {
    try {
      return await prisma.budget.delete({
        where: { id },
      });
    } catch (e) {
      return e.code;
    }
  }

  async getBudgets(user_id) {
    try {
      let budgets = await prisma.budget.findMany({
        where: {
          OR: [{ admin_id: user_id }, { consumer_id: user_id }],
        },
        include: {
          budget_history: {
            orderBy: { id: "desc" },
            take: 1,
            include: {
              expense: true,
            },
          },
        },
      });
      for (const budget of budgets) {
        budget.budget_history = budget.budget_history[0];
        budget.budget_history.percentages = await this.getPercentages(
          budget.budget_history.id
        );
      }
      return budgets;
    } catch (e) {
      console.log(e);
      return e.code;
    }
  }

  async getPercentages(budget_id) {
    try {
      const expensesByCategory = await prisma.expense.groupBy({
        where: { budget_id },
        by: ["category_id"],
        _sum: { value: true },
        _count: { category_id: true },
      });

      const budget = await prisma.budget_history.findUnique({
        where: { id: budget_id },
      });

      const current_consumption = budget.current_consumption;
      return expensesByCategory.map((expense) => {
        return {
          category_id: expense.category_id,
          percentage: (expense._sum.value / current_consumption) * 100,
        };
      });
    } catch (e) {
      console.log(e);
      return e.code;
    }
  }
}

module.exports = BudgetService;
