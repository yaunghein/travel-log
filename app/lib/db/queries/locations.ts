import { nanoid } from 'nanoid'
import { and, eq } from 'drizzle-orm'
import db from '~/lib/db'
import { location } from '~/lib/db/schema'
import type { InsertLocation } from '~/lib/db/schema'

export async function findLocationByName(
  existing: InsertLocation,
  userId: string
) {
  return await db.query.location.findFirst({
    where: and(eq(location.name, existing.name), eq(location.userId, userId)),
  })
}

export async function findLocationBySlug(slug: string) {
  return await db.query.location.findFirst({
    where: eq(location.slug, slug),
  })
}

export async function insertLocation(
  insertable: InsertLocation,
  slug: string,
  userId: string
) {
  return await db
    .insert(location)
    .values({ id: nanoid(), slug, userId, ...insertable })
    .returning()
}

export async function findLocations(userId: string) {
  return await db.query.location.findMany({
    where: eq(location.userId, userId),
  })
}
