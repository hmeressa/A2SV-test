import { AppDataSource } from '../config/connection.js';
import { Blog } from '../model/blog.js';
import { User } from '../model/user.js';

const blogRepository = AppDataSource.getRepository(Blog);
const userRepository = AppDataSource.getRepository(User);

export class BlogService {
    static async createBlog(data, userId) {
        try {
            const user = await userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }
            const newBlog = blogRepository.create({
                title: data.title,
                content: data.content,
                user,
            });

            // Save the new blog post
            await blogRepository.save(newBlog);
            return newBlog;
        } catch (error) {
            throw new Error('Error creating blog: ' + error.message);
        }
    }

    // Get all blogs
    static async getAllBlogs() {
        try {
            const blogRepository = AppDataSource.getRepository(Blog);
            return await blogRepository.find({ relations: ['user'] });  // Include user relation
        } catch (error) {
            throw new Error('Error fetching blogs: ' + error.message);
        }
    }

    // Get a blog by ID
    static async getBlogById(id) {
        try {
            const blogRepository = AppDataSource.getRepository(Blog);
            const blog = await blogRepository.findOne({
                where: { id },
                relations: ['user'],  // Include user relation
            });

            if (!blog) {
                throw new Error('Blog not found');
            }

            return blog;
        } catch (error) {
            throw new Error('Error fetching blog by ID: ' + error.message);
        }
    }

    // Update a blog
    async updateBlog(id, title, content) {
        const blog = await this.blogRepository.findOne({ where: { id } });
        if (!blog) throw new Error('Blog not found');

        blog.title = title;
        blog.content = content;
        await this.blogRepository.save(blog);

        return blog;
    }

    // Delete a blog
    async deleteBlog(id) {
        const result = await this.blogRepository.delete({ id });
        if (result.affected === 0) throw new Error('Blog not found');
        return { message: 'Blog deleted successfully' };
    }
}
