import { sqliteTable, int, text, real } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { user } from './auth'

export const location = sqliteTable('location', {
  id: text().primaryKey(),
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

export const Location = createSelectSchema(location)
export type Location = z.infer<typeof Location>

export const InsertLocation = createInsertSchema(location, {
  name: (field) =>
    field.nonempty('Name is required').trim().min(1, 'Name is required'),
  lat: () => z.coerce.number(),
  long: () => z.coerce.number(),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
})

export type InsertLocation = z.infer<typeof InsertLocation>
