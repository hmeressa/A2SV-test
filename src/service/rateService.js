// src/service/ratingService.js
import { AppDataSource } from '../config/connection.js';
import { Rating } from '../model/rate.js'; // Assuming the Rating model is defined as in the previous step
const ratingRepository = AppDataSource.getRepository(Rating);

export class RatingService {
    constructor() {
    }

    // Create a new rating
    static async createRating(userId, blogId, ratingValue) {
        try {
            if (ratingValue < 1 || ratingValue > 5) {
                throw new Error('Rating value must be between 1 and 5');
            }
            const newRating = await ratingRepository.create({
                user: { id: userId },
                blog: { id: blogId },
                ratingValue,
            });
            await ratingRepository.save(newRating);
            return newRating;
        } catch (error) {
            throw new Error('Error creating rating: ' + error.message);
        }
    }

    // Get all ratings for a specific blog
    static async getRatingsForBlog(blogId) {
        try {
            return await ratingRepository.find({ where: { blog: { id: blogId } } });
        } catch (error) {
            throw new Error('Error fetching ratings: ' + error.message);
        }
    }

    // Get a rating by user and blog
    static async getRatingByUserAndBlog(userId, blogId) {
        try {
            return await ratingRepository.findOne({
                where: { user: { id: userId }, blog: { id: blogId } },
            });
        } catch (error) {
            throw new Error('Error fetching rating by user and blog: ' + error.message);
        }
    }
}
