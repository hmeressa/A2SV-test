import { EntitySchema } from 'typeorm';

export const Rating = new EntitySchema({
    name: 'Rating',
    tableName: 'ratings',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        ratingValue: {
            type: 'int',
            nullable: false,
            check: 'ratingValue >= 1 AND ratingValue <= 5',
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
            joinColumn: {
                name: 'userId',
            },
            nullable: false,
        },
        blog: {
            type: 'many-to-one',
            target: 'Blog',
            joinColumn: {
                name: 'blogId',
            },
            nullable: false,
        },
    },
});
