import { EntitySchema } from 'typeorm';

export const Like = new EntitySchema({
    name: 'Like',
    tableName: 'likes',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        createdAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: { name: 'userId' },
            nullable: false,
            onDelete: 'CASCADE',
        },
        blog: {
            type: 'many-to-one',
            target: 'Blog',
            joinColumn: { name: 'blogId' },
            nullable: false,
            onDelete: 'CASCADE',
        },
    },
});
