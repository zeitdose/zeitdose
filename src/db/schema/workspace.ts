import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

import { journalTable } from '~/db/schema/journal'
import { userTable } from '~/db/schema/user'

export const weekdayEnum = pgEnum('weekday', ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'])

export const workspace = pgTable('journals', {
  id: serial('id').primaryKey(),
  url: varchar('domain', { length: 512 }).notNull().default(''),
  name: text('name').default('zeitdose'),
  favicon: text('favicon').default(''),

  language: text('language').default('en').notNull(),
  startWeekOn: weekdayEnum('start_week_on').default('Mon').notNull(),

  lightTheme: text('light_heme').default('brown').notNull(),
  darkTheme: text('dark_heme').default('brown').notNull(),
  fontFamily: text('font_family').default('lato'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const workspaceRelations = relations(workspace, ({ many }) => ({
  users: many(userTable),
  journals: many(journalTable),
}))

export const insertWorkSpaceSchema = createInsertSchema(workspace)
export const selectWorkSpaceSchema = createSelectSchema(workspace)
