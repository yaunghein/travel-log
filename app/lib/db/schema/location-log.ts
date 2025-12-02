import { randomUUID } from 'crypto'
import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core'
import { location } from './location'
import { user } from './auth'

export const locationLog = sqliteTable('locationLog', {
  id: text()
    .primaryKey()
    .$default(() => randomUUID()),
  name: text().notNull(),
  description: text(),
  startedAt: int().notNull(),
  endedAt: int().notNull(),
  lat: int().notNull(),
  long: int().notNull(),
  locationId: text()
    .notNull()
    .references(() => location.id),
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
