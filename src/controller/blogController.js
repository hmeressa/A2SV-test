import { BlogService } from '../../src/service/blogService.js';  // Import BlogService

export class BlogController {
    // Create a new blog post
    static async createBlog(req, res) {
        const { title, content, userId } = req.body;
        console.log("object", req.body)
        try {
            const newBlog = await BlogService.createBlog({ title, content }, userId);
            res.status(201).json(newBlog);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all blogs
    static async getAllBlogs(req, res) {
        try {
            const blogs = await BlogService.getAllBlogs();
            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a blog by ID
    static async getBlogById(req, res) {
        const { id } = req.params;
        try {
            const blog = await BlogService.getBlogById(id);
            res.status(200).json(blog);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // Update a blog
    static async updateBlog(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;
        try {
            const updatedBlog = await this.blogService.updateBlog(id, title, content);
            res.status(200).json(updatedBlog);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete a blog
    static async deleteBlog(req, res) {
        const { id } = req.params;
        try {
            const result = await this.blogService.deleteBlog(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
