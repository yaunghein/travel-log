import defineAuthenticatedEventHandler from '../utils/define-authenticated-event-handler'
import { findLocations } from '~/lib/db/queries/locations'

export default defineAuthenticatedEventHandler(async (event) => {
  return findLocations(event.context.user.id)
})
