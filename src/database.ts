import { createPool, createSqlTag } from 'slonik'
import { z } from 'zod'

const DATABASE_URL = process.env.DATABASE_URL || ''

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set')

export const databasePool = await createPool(DATABASE_URL)

const sql = createSqlTag({
    typeAliases: {
        val: z.object({
            val: z.number(),
        }),
    },
})

databasePool.query(sql.typeAlias('val')`select 1 as val`)
