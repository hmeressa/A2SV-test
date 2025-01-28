import express from 'express';
import { AppDataSource } from './src/config/connection.js'; // Import the database connection
import { UserController } from './src/controller/userController.js'; // Import the UserController
import { BlogController } from './src/controller/blogController.js';
import { RatingController } from './src/controller/rateController.js';
import authenticateToken from './src/middleware/auth.js';
import { CommentController } from './src/controller/commentController.js';
import { SearchController } from './src/controller/searchController.js';
import { LikeController } from './src/controller/likeController.js';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define the POST route for user creation
app.post('/api/v1/users', authenticateToken, UserController.createUser);
app.get('/api/v1/users', authenticateToken, UserController.getAllUsers);
// Auth user routes
app.post('/api/v1/users/auth', authenticateToken, UserController.authenticateUser);

//Blog routes
app.post('/api/v1/blogs', authenticateToken, BlogController.createBlog);
app.get('/api/v1/blogs', authenticateToken, BlogController.getAllBlogs);
app.get('/api/v1/blogs/:id', authenticateToken, BlogController.getBlogById);
app.put('/api/v1/blogs', authenticateToken, BlogController.updateBlog);
app.delete('/api/v1/blogs', authenticateToken, BlogController.deleteBlog);

// Rating routes
app.post('/api/v1/rating', authenticateToken, RatingController.createRating);
app.get('/api/v1/rating', authenticateToken, RatingController.getRatingByUserAndBlog);
app.get('/api/v1/blogs/:blogId/rating', RatingController.getRatingsForBlog);
app.get('/api/v1/users/:userId/blogs/:blogId/rating', authenticateToken, RatingController.getRatingByUserAndBlog);


// Create a new comment
app.post('/api/v1/comments', authenticateToken, CommentController.createComment);
app.get('/api/v1/comments/:blogId', CommentController.getCommentsForBlog);
app.get('/api/v1/comment/:id', CommentController.getCommentById);
app.put('/api/v1/comments', CommentController.updateComment);
app.delete('/api/v1/comment', CommentController.deleteComment);

// Like a blog
router.post('/likes', (req, res) => likeController.likeBlog(req, res));

//Like routes
router.post('/likes', LikeController.likeBlog);
router.delete('/likes', LikeController.unlikeBlog);
router.get('/blogs/:blogId/likes', LikeController.getLikesForBlog);
router.get('/users/:userId/likes', LikeController.getLikesByUser);


// Define search routes
app.get('/search/users', SearchController.searchUsers);
app.get('/search/blogs', (req, res) => SearchController.searchBlogs);

// Initialize database connection
await AppDataSource.initialize()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
