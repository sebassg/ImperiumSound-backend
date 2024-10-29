
import { UseerModel } from "../models/sqlite/users.js";

// esto tendria mas sentido con una interfase --> no usa logica, solo maneja conexiones a base de datos

export class UserRepository {
  async getAllUsers() {
    return await UseerModel.getAlll();
  }

  async getUserById({ id }) {
    return await UseerModel.getById({ id });
  }

  async createUser({ input }) {
    return await UseerModel.create({ input });
  }

  async deleteUser({ id }) {
    return await UserModel.delete({ id });
  }

  async updateUser({ id, input }) {
    return await UserModel.update({ id, input });
  }
}
