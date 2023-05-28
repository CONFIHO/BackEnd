const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserService {
  async findAll(rol_id) {
    try {
      return await prisma.user.findMany({
        where: { rol_id },
        select: {
          id: true,
          name: true,
          email: true,
          code: true,
          rol_id: true
        }
      });
    } catch (e) {
      return e.code;
    }
  }

  async findOne(id) {
    try {
      return await prisma.user.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          code: true,
          rol_id: true
        }
      });
    } catch (e) {
      return e.code;
    }
  }

  async create(data) {
    try {
      return await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          rol_id: data.rol_id,
          password: data.password,
        },
      });
    } catch (e) {
      return e.code;
    }
  }

  async update(data) {
    try {
      return await prisma.user.update({
        where: { id: data.id },
        data: {
          name: data.name,
          email: data.email,
          rol_id: data.rol_id,
          password: data.password,
          code: data.code,
        },
      });
    } catch (e) {
      return e.code;
    }
  }

  async delete(id) {
    try {
      return await prisma.user.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          code: true,
          rol_id: true
        }
      });
    } catch (e) {
      return e.code;
    }
  }
}

module.exports = UserService;
