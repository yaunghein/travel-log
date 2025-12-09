import { findLocation } from '~/lib/db/queries/locations'
import defineAuthenticatedEventHandler from '../../utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  // await new Promise((r) => setTimeout(r, 2000))
  const slug = getRouterParam(event, 'slug') as string
  const location = await findLocation(slug, event.context.user.id)
  if (!location) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Location not found.',
      })
    )
  }
  return location
})
