import { randomUUID } from 'crypto'
import db from '~/lib/db'
import { InsertLocation, location } from '~/lib/db/schema'

export default defineEventHandler(async (event) => {
  console.log({ user2: event.context.user })
  if (!event.context.user) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    )
  }

  const body = await readValidatedBody(event, InsertLocation.safeParse)

  if (!body.success) {
    const statusMessage = body.error.issues
      .map((issue) => `${issue.path.join('')}: ${issue.message}`)
      .join('; ')

    const data = body.error.issues.reduce((errors, issue) => {
      errors[issue.path.join('')] = issue.message
      return errors
    }, {} as Record<string, string>)

    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage,
        data,
      })
    )
  }

  const [created] = await db
    .insert(location)
    .values({
      ...body.data,
      slug: body.data.name.replace(' ', '-').toLowerCase(),
      userId: event.context.user.id,
      id: randomUUID(),
    })
    .returning()

  return created
})
