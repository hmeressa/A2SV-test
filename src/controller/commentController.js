import { CommentService } from '../../src/service/commentService.js';

export class CommentController {
    // Create a new comment
    static async createComment(req, res) {
        const { content, blogId } = req.body;

        try {
            const comment = await CommentService.createComment(content, userId, blogId);
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all comments for a blog
    static async getCommentsForBlog(req, res) {
        const { blogId } = req.params;

        try {
            const comments = await this.commentService.getCommentsForBlog(blogId);
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a comment by ID
    static async getCommentById(req, res) {
        const { id } = req.params;

        try {
            const comment = await this.commentService.getCommentById(id);
            if (!comment) {
                res.status(404).json({ message: 'Comment not found' });
                return;
            }
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update a comment
    static async updateComment(req, res) {
        const { id } = req.params; // Comment ID
        const { content } = req.body; // New content for the comment
        const userId = req.user.id; // User ID from JWT token (authorization)

        try {
            const updatedComment = await this.commentService.updateComment(id, userId, content);
            res.status(200).json(updatedComment);
        } catch (error) {
            res.status(error.message === 'Unauthorized to update this comment' ? 403 : 500).json({ message: error.message });
        }
    }

    // Delete a comment
    static async deleteComment(req, res) {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            const result = await this.commentService.deleteComment(id, userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.message === 'Unauthorized to delete this comment' ? 403 : 500).json({ message: error.message });
        }
    }
}
