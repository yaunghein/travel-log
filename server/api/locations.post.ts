import { nanoid } from 'nanoid'
import slugify from 'slug'
import { InsertLocation, location } from '~/lib/db/schema'
import { findLocationBySlug, insertLocation } from '~/lib/db/queries/locations'
import sendZodError from '../utils/send-zod-error'
import defineAuthenticatedEventHandler from '../utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const body = await readValidatedBody(event, InsertLocation.safeParse)
  console.log(body)

  if (!body.success) {
    return sendZodError(event, body.error)
  }

  let slug = slugify(body.data.name)
  const existing = await findLocationBySlug(slug)
  if (existing) {
    slug += `-${nanoid()}`
  }

  const location = await insertLocation(body.data, slug, event.context.user.id)

  return location
})
