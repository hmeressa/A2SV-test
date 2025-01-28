// src/controller/ratingController.js
import { RatingService } from '../../src/service/rateService.js';

export class RatingController {
    // Create a new rating
    static async createRating(req, res) {
        console.log("object", req.body)
        const { userId, blogId, ratingValue } = req.body;
        try {
            const rating = await RatingService.createRating(userId, blogId, ratingValue);
            res.status(201).json(rating);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all ratings for a specific blog
    static async getRatingsForBlog(req, res) {
        const { blogId } = req.params;
        try {
            const ratings = await RatingService.getRatingsForBlog(blogId);
            res.status(200).json(ratings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a rating by user and blog
    static async getRatingByUserAndBlog(req, res) {
        const { userId, blogId } = req.params;
        try {
            const rating = await RatingService.getRatingByUserAndBlog(userId, blogId);
            if (!rating) {
                return res.status(404).json({ message: 'Rating not found' });
            }
            res.status(200).json(rating);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a rating by user and blog
    static async getAllBlogsByUserIdAndByBlogId() {
        try {
            const rating = await RatingService(userId, blogId);
            if (!rating) {
                return res.status(404).json({ message: 'Rating not found' });
            }
            res.status(200).json(rating);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
