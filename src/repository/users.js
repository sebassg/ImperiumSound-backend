import { UserModel } from "../models/mysql/users.js";

// esto tendria mas sentido con una interfase --> no usa logica, solo maneja conexiones a base de datos

export class UserRepository {
  async getAllUsers() {
    return await UserModel.getAll();
  }

  async getUserById({ id }) {
    return await UserModel.getById({ id });
  }

  async createUser({ input }) {
    return await UserModel.create({ input });
  }

  async deleteUser({ id }) {
    return await UserModel.delete({ id });
  }

  async updateUser({ id, input }) {
    return await UserModel.update({ id, input });
  }
}
