import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core'
import { location } from './location'

export const locationLog = sqliteTable('locationLog', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  startedAt: int().notNull(),
  endedAt: int().notNull(),
  lat: int().notNull(),
  long: int().notNull(),
  locationId: int()
    .notNull()
    .references(() => location.id),
  createdAt: int()
    .notNull()
    .$default(() => Date.now()),
  updatedAt: int()
    .notNull()
    .$default(() => Date.now())
    .$onUpdate(() => Date.now()),
})
