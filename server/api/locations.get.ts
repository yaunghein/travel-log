import defineAuthenticatedEventHandler from '../utils/define-authenticated-event-handler'
import { findLocations } from '~/lib/db/queries/locations'

export default defineAuthenticatedEventHandler(async (event) => {
  // await new Promise((r) => setTimeout(r, 2000))
  return findLocations(event.context.user.id)
})
