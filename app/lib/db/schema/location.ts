import { randomUUID } from 'crypto'
import { sqliteTable, int, text, real } from 'drizzle-orm/sqlite-core'
import { user } from './auth'

export const location = sqliteTable('location', {
  id: text()
    .primaryKey()
    .$default(() => randomUUID()),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id),
  createdAt: int()
    .notNull()
    .$default(() => Date.now()),
  updatedAt: int()
    .notNull()
    .$default(() => Date.now())
    .$onUpdate(() => Date.now()),
})
