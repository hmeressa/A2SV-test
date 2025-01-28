export class SearchService {
    constructor(userRepository, blogRepository) {
        this.userRepository = userRepository;
        this.blogRepository = blogRepository;
    }

    // Search users by name or username
    async searchUsers(query) {
        return await this.userRepository.find({
            where: [
                { name: { $ilike: `%${query}%` } },       // Search by name (case-insensitive)
                { username: { $ilike: `%${query}%` } },   // Search by username (case-insensitive)
            ],
        });
    }

    // Search blog posts by content, tags, or title
    async searchBlogs(query) {
        return await this.blogRepository.find({
            where: [
                { content: { $ilike: `%${query}%` } },   // Search by content (case-insensitive)
                { tags: { $ilike: `%${query}%` } },     // Search by tags (case-insensitive)
                { title: { $ilike: `%${query}%` } },    // Search by title (case-insensitive)
            ],
        });
    }
}
