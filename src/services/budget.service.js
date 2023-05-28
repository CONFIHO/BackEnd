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
          consumer_nickname: data.consumer_nickname
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
          status: data.status
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
}

module.exports = BudgetService;
