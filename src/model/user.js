import { EntitySchema } from 'typeorm';
import { UserRoles } from '../../src/enum/user.js';

// Define the User entity
export const User = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',  // Generate UUID automatically
            default: () => 'gen_random_uuid()',  // Use PostgreSQL's gen_random_uuid
        },
        name: {
            type: String,
            nullable: false,
        },
        email: {
            type: String,
            nullable: false,
            unique: true,  // Ensure email is unique
        },
        password: {
            type: String,
            nullable: false,  // Store the hashed password here
        },
        username: {
            type: String,
            nullable: true,  // Optional username field
        },
        bio: {
            type: String,
            nullable: true,
        },
        role: {
            type: 'enum',
            enum: UserRoles, // Enforce the role to be one of the defined roles
            default: UserRoles.USER, // Default role is 'user'
        },
        createdAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
        updatedAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
        },
    },
});
