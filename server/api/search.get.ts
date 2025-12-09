import { z } from 'zod'
import sendZodError from '../utils/send-zod-error'
import defineAuthenticatedEventHandler from '../utils/define-authenticated-event-handler'
import { SearchSchema, NominatimResult } from '../../app/types'

export default defineAuthenticatedEventHandler(
  defineCachedEventHandler(
    async (event) => {
      const body = await getValidatedQuery(event, SearchSchema.safeParse)

      if (!body.success) {
        return sendZodError(event, body.error)
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${body.data.q}&format=json`,
          {
            signal: AbortSignal.timeout(10000),
            headers: {
              'User-Agent': 'travel-log-tutorial | yanaunghein311@gmail.com',
            },
          }
        )
        if (!response.ok) {
          return sendError(
            event,
            createError({
              statusCode: 504,
              statusMessage: 'Unable to reach search API.',
            })
          )
        }
        return (await response.json()) as NominatimResult[]
      } catch {
        return sendError(
          event,
          createError({
            statusCode: 504,
            statusMessage: 'Unable to reach search API.',
          })
        )
      }
    },
    {
      maxAge: 60 * 60 * 24,
      name: 'search-nominatim',
      getKey: (event) => {
        const query = getQuery(event)
        return query.q?.toString() || ''
      },
    }
  )
)
