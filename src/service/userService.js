import { AppDataSource } from '../../src/config/connection.js';  // Adjust path as needed
import { User } from '../model/user.js';  // Adjust path as needed
import bcrypt from 'bcrypt';

const userRepository = AppDataSource.getRepository(User);

export class UserService {
  constructor() { }

  static async createUser(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = userRepository.create({
        ...data, password: hashedPassword,
      });
      await userRepository.save(newUser);
      await await userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Get all users
  static async getAllUsers() {
    try {
      return await userRepository.find();
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }
  async getUserById(id) {
    try {
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user by ID: ' + error.message);
    }
  }

  // Update a user
  async updateUser(id, data) {
    try {
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }
      Object.assign(user, data);
      await userRepository.save(user);
      return user;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  // Delete a user
  async deleteUser(id) {
    try {
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }
      await userRepository.remove(user);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }

  // Authenticate user during login
  static async authenticateUser(email, password) {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }
}
