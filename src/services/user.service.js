const { PrismaClient } = require("@prisma/client");
const Roles = require("../domain/constants/Roles");
const getRandomCode = require("../util/code-generator");
const prisma = new PrismaClient();

class UserService {
  async findAll(nameFilter, rol_id) {
    if (rol_id) {
      rol_id = parseInt(rol_id);
    }
    try {
      return await prisma.user.findMany({
        where: {
          name: { contains: nameFilter },
          rol_id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          code: true,
          rol_id: true,
          is_active: true,
        },
      });
    } catch (e) {
      return e;
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
          rol_id: true,
          is_active: true,
        },
      });
    } catch (e) {
      return e;
    }
  }

  async create(data) {
    if (data.rol_id == Roles.CONSUMMER) {
      let user = null;
      do {
        data.code = getRandomCode();
        user = await prisma.user.findFirst({ where: { code: data.code } });
      } while (user != null);
    }
    try {
      return await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          rol_id: data.rol_id,
          code: data.code,
          password: data.password,
          is_active: data.is_active,
        },
      });
    } catch (e) {
      return e;
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
          is_active: data.is_active,
        },
      });
    } catch (e) {
      return e;
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
          rol_id: true,
          is_active: true,
        },
      });
    } catch (e) {
      return e;
    }
  }

  async auth(data) {
    try {
      return await prisma.user.findFirst({
        where: {
          email: data.email,
          password: data.password,
          is_active: true,
        },
        select: {
          id: true,
          name: true,
          email: true,
          code: true,
          rol_id: true,
          is_active: true,
        },
      });
    } catch (e) {
      return e;
    }
  }
}

module.exports = UserService;
