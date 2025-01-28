// import express from 'express';
// import { AppDataSource } from './config/connection';

// const app = express();
// const port = 3000;

// app.use(express.json()); // Middleware to parse JSON bodies

// // Initialize TypeORM connection
// AppDataSource.initialize()
//     .then(() => {
//         console.log('Connected to PostgreSQL database');
//     })
//     .catch((err) => {
//         console.error('Database connection error:', err);
//     });

// // Start the Express server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
