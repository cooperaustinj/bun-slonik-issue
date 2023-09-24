import { createPool, createSqlTag } from 'slonik'
import { z } from 'zod'

const DATABASE_URL = process.env.DATABASE_URL || ''

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set')

export const databasePool = await createPool(DATABASE_URL)

const sql = createSqlTag({
    typeAliases: {
        // `foo` is a documentation specific example
        foo: z.object({
            foo: z.string(),
        }),
        id: z.object({
            id: z.number(),
        }),
        void: z.object({}).strict(),
    },
})

databasePool.query(sql.typeAlias('id')`select 1 as id`)
