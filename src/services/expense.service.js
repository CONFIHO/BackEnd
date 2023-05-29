const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserService {
  async findAll(budget_id) {
    try {
      return await prisma.expense.findMany({
        where: { budget_id },
      });
    } catch (e) {
      return e.code;
    }
  }

  async findOne(id) {
    try {
      return await prisma.expense.findFirst({
        where: { id },
      });
    } catch (e) {
      return e.code;
    }
  }

  async create(data) {
    try {
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
      return e.code;
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
      return e.code;
    }
  }

  async delete(id) {
    try {
      return await prisma.expense.delete({
        where: { id },
      });
    } catch (e) {
      return e.code;
    }
  }
}

module.exports = UserService;
