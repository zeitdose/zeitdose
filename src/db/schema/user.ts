import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

import { journalTable } from '~/db/schema/journal'
import { noteTable } from '~/db/schema/note'
import { workspace } from '~/db/schema/workspace'

export const reminderEnum = pgEnum('reminder', ['system', 'email', 'telegram', 'matrix'])

export const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  username: text('name').notNull().unique(),
  email: text('email'),
  avatarUrl: varchar('avatar', { length: 512 }).default(''),
  hashedPassword: text('hashed_password').notNull(),

  reminder: reminderEnum('reminder').default('system'),
  remindBefore: integer('remind_before').default(7),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  workspaceId: integer('workspace_id').references(() => workspace.id, {
    onDelete: 'cascade',
  }),
})

export const userRelations = relations(userTable, ({ many, one }) => ({
  workspace: one(workspace, {
    fields: [userTable.workspaceId],
    references: [workspace.id],
    relationName: 'userWorkspace',
  }),
}))

export const insertUserSchema = createInsertSchema(userTable)
export const selectUserSchema = createSelectSchema(userTable)

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
