import { EntitySchema } from 'typeorm';

export const Blog = new EntitySchema({
    name: 'Blog',
    tableName: 'blogs',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
            default: () => 'gen_random_uuid()',
        },
        title: {
            type: String,
            nullable: false,
        },
        content: {
            type: String,
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
    },
});
