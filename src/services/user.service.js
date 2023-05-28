const { PrismaClient } = require("@prisma/client");
const { User } = require("../domain/users/entities/User");
const prisma = new PrismaClient();

class UserService {
  async findAll(rol_id) {
    try {
      return await prisma.user.findMany({
        where: { rol_id },
      });
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
      throw Error("User no found");
    }
  }

  async delete(id) {
    try {
      return await prisma.user.delete({
        where: { id },
      });
    } catch (e) {
      throw Error("User not found");
    }
  }
}

module.exports = UserService;
