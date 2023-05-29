const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserService {
  async findAll(budget_id) {
    try {
      return await prisma.expense.findMany({
        where: { budget_id },
      });
    } catch (e) {
      return e;
    }
  }

  async findOne(id) {
    try {
      return await prisma.expense.findFirst({
        where: { id },
      });
    } catch (e) {
      return e;
    }
  }

  async create(data) {
    try {
      await prisma.budget_history.update({
        where: { id: data.budget_id },
        data: { current_consumption: { increment: data.value } },
      });
      return await prisma.expense.create({
        data: {
          description: data.description,
          value: data.value,
          file_name: data.file_name,
          fileData: data.fileData,
          expense_date: data.expense_date,
          category_id: data.category_id,
          budget_id: data.budget_id,
        },
      });
    } catch (e) {
      return e;
    }
  }

  async update(data) {
    try {
      return await prisma.expense.update({
        where: { id: data.id },
        data: {
          description: data.description,
          value: data.value,
          file_name: data.file_name,
          fileData: data.fileData,
          expense_date: data.expense_date,
          category_id: data.category_id,
        },
      });
    } catch (e) {
      return e;
    }
  }

  async delete(id) {
    try {
      return await prisma.expense.delete({
        where: { id },
      });
    } catch (e) {
      return e;
    }
  }

  async consumptionReport(data) {
    try {
      return await prisma.expense.groupBy({
        where: {
          AND: [
            { expense_date: { gte: new Date(data.start_date) } },
            { expense_date: { lte: new Date(data.end_date) } },
          ],
        },
        by: ["expense_date"],
        _sum: {value: true}
      });
    } catch (e) {
      return e;
    }
  }

  async categoriesExpensesReport(data) {
    try {
      return await prisma.expense.groupBy({
        where: {
          AND: [
            { expense_date: { gte: new Date(data.start_date) } },
            { expense_date: { lte: new Date(data.end_date) } },
          ],
        },
        by: ["category_id"],
        _count: {id: true}
      });
    } catch (e) {
      return e;
    }
  }
}

module.exports = UserService;
