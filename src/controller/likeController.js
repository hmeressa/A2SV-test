import { LikeService } from "../../src/service/likeService.js";

export class LikeController {

    // Like a blog
    static async likeBlog(req, res) {
        const { userId, blogId } = req.body;
        try {
            const result = await LikeService.likeBlog(userId, blogId);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Unlike a blog
    static async unlikeBlog(req, res) {
        const { userId, blogId } = req.body;
        try {
            const result = await LikeService.unlikeBlog(userId, blogId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Get likes for a blog
    static async getLikesForBlog(req, res) {
        const { blogId } = req.params;
        try {
            const likes = await LikeService.getLikesForBlog(blogId);
            res.status(200).json(likes);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Get blogs liked by a user
    static async getLikesByUser(req, res) {
        const { userId } = req.params;
        try {
            const likes = await LikeService.getLikesByUser(userId);
            res.status(200).json(likes);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
