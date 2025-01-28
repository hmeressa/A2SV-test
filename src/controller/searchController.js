import { SearchService } from "../../src/service/searchService.js";

export class SearchController {

    // Search users endpoint
    static async searchUsers(req, res) {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        try {
            const users = await SearchService.searchUsers(query);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Search blog posts endpoint
    static async searchBlogs(req, res) {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        try {
            const blogs = await SearchService.searchBlogs(query);
            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
