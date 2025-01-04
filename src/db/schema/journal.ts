import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

import type { InsertJournal, Journal } from '~/types/journal'

import { userTable } from '~/db/schema/user'
import { workspace } from '~/db/schema/workspace'

export const journalTable = pgTable('journals', {
  authorId: integer('author_id').notNull().references(() => userTable.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  workspaceId: integer('workspace_id').references(() => workspace.id, {
    onDelete: 'cascade',
  }),
})

export const journalRelations = relations(journalTable, ({ one }) => ({
  author: one(userTable, {
    fields: [journalTable.authorId],
    references: [userTable.id],
    relationName: 'journalAuthor',
  }),
  workspace: one(workspace, {
    fields: [journalTable.workspaceId],
    references: [workspace.id],
    relationName: 'journalWorkspace',
  }),
}))

export const insertJournalSchema = createInsertSchema<typeof journalTable, InsertJournal>(journalTable)
export const selectJournalSchema = createSelectSchema<typeof journalTable, Journal>(journalTable)
