import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

import { workspace } from '~/db/schema/workspace'

export const reminderEnum = pgEnum('reminder', ['system', 'email', 'telegram', 'matrix'])

export const userTable = pgTable('user', {
  avatarUrl: varchar('avatar', { length: 512 }).default(''),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  email: text('email'),
  hashedPassword: text('hashed_password').notNull(),
  id: serial('id').primaryKey(),

  remindBefore: integer('remind_before').default(7),
  reminder: reminderEnum('reminder').default('system'),

  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  username: text('name').notNull().unique(),
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
  expiresAt: timestamp('expires_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  id: text('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id),
})
