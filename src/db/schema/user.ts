import type { Lucia } from 'lucia'

import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

import { journalTable } from '~/db/schema/journal'
import { noteTable } from '~/db/schema/note'
import { workspace } from '~/db/schema/workspace'

export const reminderEnum = pgEnum('reminder', ['system', 'email', 'telegram', 'matrix'])

export const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  avatarUrl: varchar('avatar', { length: 512 }).default(''),
  hashedPassword: text('hash_password'),

  reminder: reminderEnum('reminder').default('system'),
  remindBefore: integer('remind_before').default(7),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
  workspaceId: integer('workspace_id').references(() => workspace.id, {
    onDelete: 'cascade',
  }),
})

export const userRelations = relations(userTable, ({ many, one }) => ({
  journals: many(journalTable),
  notes: many(noteTable),
  workspace: one(workspace, {
    fields: [userTable.workspaceId],
    references: [workspace.id],
  }),
}))

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})
