import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

import { journalTable } from '~/db/schema/journal'
import { userTable } from '~/db/schema/user'

export const noteTable = pgTable('notes', {
  authorId: integer('author_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),

  id: serial('id').primaryKey(),
  journalId: integer('journal_id').references(() => journalTable.id),

  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  wordsCount: integer('words_count'),
})

export const notesRelations = relations(noteTable, ({ one }) => ({
  noteToAuthor: one(userTable, {
    fields: [noteTable.authorId],
    references: [userTable.id],
  }),
  noteToJournal: one(journalTable, {
    fields: [noteTable.journalId],
    references: [journalTable.id],
  }),
}))

export const insertNoteSchema = createInsertSchema(noteTable)
export const selectNoteSchema = createSelectSchema(noteTable)
