import { AppDataSource } from '../config/connection.js';
import { Comment } from '../model/comment.js';
const commentRepository = AppDataSource.getRepository(Comment);

export class CommentService {
    // Create a new comment
    static async createComment(content, userId, blogId) {
        const comment = commentRepository.create({
            content,
            user: { id: userId },
            blog: { id: blogId },
        });
        return await commentRepository.save(comment);
    }

    // Get all comments for a specific blog
    static async getCommentsForBlog(blogId) {
        return await commentRepository.find({
            where: { blog: { id: blogId } },
            relations: ['user', 'blog'],  // Populate user and blog data
        });
    }

    // Get a comment by ID
    static async getCommentById(id) {
        return await commentRepository.findOne({
            where: { id },
            relations: ['user', 'blog'],
        });
    }

    // Update a comment
    async updateComment(commentId, userId, content) {
        // Find the comment by its ID
        const comment = await commentRepository.findOne({ where: { id: commentId } });
        if (!comment) {
            throw new Error('Comment not found');
        }

        // Check if the user is authorized to update the comment
        if (comment.userId !== userId) {
            throw new Error('Unauthorized to update this comment');
        }

        // Update the content and save it back to the database
        comment.content = content;
        await commentRepository.save(comment);

        return comment; // Return the updated comment
    }

    // Delete a comment
    async deleteComment(commentId, userId) {
        // Find the comment by its ID
        const comment = await commentRepository.findOne({ where: { id: commentId } });
        if (!comment) {
            throw new Error('Comment not found');
        }

        // Check if the user is authorized to delete the comment
        if (comment.userId !== userId) {
            throw new Error('Unauthorized to delete this comment');
        }

        // Delete the comment from the database
        await commentRepository.delete(commentId);

        return { message: 'Comment deleted successfully' }; // Return a success message
    }
}
