import { DataSource } from 'typeorm';
import { User } from '../../src/model/user.js';
import { Blog } from '../model/blog.js';
import { Rating } from '../model/rate.js';
import { Comment } from '../model/comment.js';
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'hmeressa',
    database: 'test',
    synchronize: true,
    logging: true,
    entities: [User, Blog, Rating, Comment],
    migrations: [],
    subscribers: [],
});
