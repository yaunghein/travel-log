import { randomUUID } from 'crypto'
import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core'
import { locationLog } from './location-log'
import { user } from './auth'

export const locationLogImage = sqliteTable('locationLogImage', {
  id: text()
    .primaryKey()
    .$default(() => randomUUID()),
  key: text().notNull(),
  locationLogId: text()
    .notNull()
    .references(() => locationLog.id),
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
