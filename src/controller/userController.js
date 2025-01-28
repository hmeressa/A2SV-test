import { UserService } from '../../src/service/userService.js';  // Adjust the path as needed
import jwt from 'jsonwebtoken';

export class UserController {
    static async createUser(req, res) {
        try {
            const userData = req.body;
            const user = await UserService.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all users
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a user by ID
    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async authenticateUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserService.authenticateUser(email, password);
            const token = jwt.sign({ id: user.id, email: user.email }, 'kdghkdshgkdgjkh', { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
