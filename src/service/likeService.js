import { AppDataSource } from "../config/connection.js";
import { Blog } from "../model/blog.js";
import { Like } from "../model/Like.js";
import { User } from "../model/user.js";

const likeRepository = AppDataSource.getRepository(Like);
const userRepository = AppDataSource.getRepository(User);
const blogRepository = AppDataSource.getRepository(Blog);

export class LikeService {

    static async likeBlog(userId, blogId) {
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const blog = await blogRepository.findOne({ where: { id: blogId } });
        if (!blog) {
            throw new Error('Blog not found');
        }

        const existingLike = await likeRepository.findOne({ where: { user: { id: userId }, blog: { id: blogId } } });
        if (existingLike) {
            throw new Error('Blog is already liked by the user');
        }

        const newLike = likeRepository.create({ user, blog });
        return await likeRepository.save(newLike);
    }

    // Remove a like from a blog
    static async unlikeBlog(userId, blogId) {
        const like = await likeRepository.findOne({ where: { user: { id: userId }, blog: { id: blogId } } });
        if (!like) {
            throw new Error('Like not found');
        }

        return await likeRepository.remove(like);
    }

    // Get all likes for a specific blog
    static async getLikesForBlog(blogId) {
        const blog = await blogRepository.findOne({ where: { id: blogId } });
        if (!blog) {
            throw new Error('Blog not found');
        }

        return await likeRepository.find({ where: { blog: { id: blogId } }, relations: ['user'] });
    }

    // Get all blogs liked by a specific user
    static async getLikesByUser(userId) {
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        return await likeRepository.find({ where: { user: { id: userId } }, relations: ['blog'] });
    }
}
