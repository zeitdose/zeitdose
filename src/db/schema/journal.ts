import { relations } from 'drizzle-orm'
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

import { noteTable } from '~/db/schema/note'
import { userTable } from '~/db/schema/user'

export const journalTable = pgTable('journals', {
  authorId: integer('author_Id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  cover: text('cover'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  creatorId: integer('creator_id').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
  description: text('description'),
  expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
  id: serial('id').primaryKey(),

  isExpired: boolean('is_expired').default(false),
  isPublic: boolean('is_public').default(false),
  notesCount: integer('notes_count'),

  slug: varchar('slug', { length: 256 }).notNull().unique(),
  title: text('title').notNull(),
})

export const journalsRelations = relations(journalTable, ({ many, one }) => ({
  creators: one(userTable, {
    fields: [journalTable.creatorId],
    references: [userTable.id],
  }),
  notes: many(noteTable),
}))

export const insertJournalSchema = createInsertSchema(journalTable)
export const selectJournalSchema = createSelectSchema(journalTable)
