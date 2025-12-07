import { nanoid } from 'nanoid'
import slugify from 'slug'
import { InsertLocation, location } from '~/lib/db/schema'
import { findLocationBySlug, insertLocation } from '~/lib/db/queries/locations'
import defineAuthenticatedEventHandler from '../utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const body = await readValidatedBody(event, InsertLocation.safeParse)

  if (!body.success) {
    const statusMessage = body.error.issues
      .map((issue) => {
        return `${issue.path.join('')}: ${issue.message}`
      })
      .join('; ')

    const data = body.error.issues.reduce(
      (errors, issue) => {
        errors[issue.path.join('')] = issue.message
        return errors
      },
      {} as Record<string, string>
    )

    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage,
        data,
      })
    )
  }

  let slug = slugify(body.data.name)
  const existing = await findLocationBySlug(slug)
  if (existing) {
    slug += `-${nanoid()}`
  }

  const location = await insertLocation(body.data, slug, event.context.user.id)

  return location
})
