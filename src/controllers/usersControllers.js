import bcrypt from "bcrypt";

import { UserRepository } from "../repository/users.js";
import { validatePartialUser, validateUser } from "../schemas/users.js";
import { SALT_ROUNDS } from "../config.js";

const userRepository = new UserRepository();

export class userController {
  static async getAll(req, res) {
    const users = await userRepository.getAllUsers();
    res.json(users);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const user = await userRepository.getUserById({ id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  }

  static async create(req, res) {
    const result = validateUser(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const user = result.data;
    const hashedPassword = await bcrypt.hash(user.passw, SALT_ROUNDS);

    const createToUser = {
        ...user,
        passw: hashedPassword
    }

    const newUser = await userRepository.createUser({ input: createToUser })

    res.status(201).json(newUser.id);
  }
  static async delete(req, res) {
    const { id } = req.params;
    const result = await userRepository.deleteUser({ id });
    if (result === false) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json({ message: "user deleted" });
  }

  static async update(req, res) {
    const { id } = req.params;
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    } else {
      const updateUser = await userRepository.updateUser({
        id,
        input: result.data,
      });
      if (updateUser) {
        res.json(updateUser);
      } else {
        return res.json({ message: "user not found" });
      }
    }
  }
}
