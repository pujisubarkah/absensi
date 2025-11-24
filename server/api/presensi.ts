import { db } from '~/server/db'
import { presensi } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    try {
      const result = await db.select().from(presensi).orderBy(presensi.createdAt)

      return { success: true, data: result }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch attendance data'
      })
    }
  } else if (method === 'POST') {
    const body = await readBody(event)

    try {
      const result = await db.insert(presensi).values({
        name: body.name,
        email: body.email,
        phone: body.phone,
        organization: body.organization,
        signature: body.signature,
      }).returning()

      return { success: true, data: result[0] }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to save attendance data'
      })
    }
  } else {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }
})