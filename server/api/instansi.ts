import { db } from '~/server/db'
import { instansi } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    try {
      const result = await db.select().from(instansi).orderBy(instansi.id)

      return { success: true, data: result }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch instansi data'
      })
    }
  } else if (method === 'POST') {
    const body = await readBody(event)

    try {
      const result = await db.insert(instansi).values({
        namaInstansi: body.namaInstansi,
      }).returning()

      return { success: true, data: result[0] }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to save instansi data'
      })
    }
  } else {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }
})