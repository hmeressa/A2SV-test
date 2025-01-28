import { EntitySchema } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export const Comment = new EntitySchema({
    name: 'Comment',
    tableName: 'comments',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: true,
            default: () => 'gen_random_uuid()',
        },
        content: {
            type: 'text',
            nullable: false,
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
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: true,
            nullable: false,
        },
        blog: {
            type: 'many-to-one',
            target: 'Blog',
            joinColumn: true,
            nullable: false,
        },
    },
});
