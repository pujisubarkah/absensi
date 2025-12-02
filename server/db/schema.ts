import { pgSchema, serial, text, timestamp, bigint, bigserial } from 'drizzle-orm/pg-core'

const absensiSchema = pgSchema('absensi')

export const presensi = absensiSchema.table('presensi', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  organization: text('organization').notNull(),
  signature: text('signature').notNull(), // Base64 encoded signature
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const instansi = absensiSchema.table('instansi', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  namaInstansi: text('nama_instansi').notNull(),
})