import { relations } from 'drizzle-orm'
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

import { noteTable } from '~/db/schema/note'
import { userTable } from '~/db/schema/user'

export const journalTable = pgTable('journals', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  cover: text('cover'),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  notesCount: integer('notes_count'),
  isPublic: boolean('is_public').default(false),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
  isExpired: boolean('is_expired').default(false),

  authorId: integer('author_Id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  creatorId: integer('creator_id').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
})

export const journalsRelations = relations(journalTable, ({ many, one }) => ({
  notes: many(noteTable),
  creators: one(userTable, {
    fields: [journalTable.creatorId],
    references: [userTable.id],
  }),
}))

export const insertJournalSchema = createInsertSchema(journalTable)
export const selectJournalSchema = createSelectSchema(journalTable)
