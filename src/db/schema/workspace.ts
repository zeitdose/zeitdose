import { pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

export const weekdayEnum = pgEnum('weekday', ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'])

export const workspace = pgTable('journals', {
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  darkTheme: text('dark_heme').default('brown').notNull(),
  favicon: text('favicon').default(''),
  fontFamily: text('font_family').default('lato'),

  id: serial('id').primaryKey(),
  language: text('language').default('en').notNull(),

  lightTheme: text('light_heme').default('brown').notNull(),
  name: text('name').default('zeitdose'),
  startWeekOn: weekdayEnum('start_week_on').default('Mon').notNull(),

  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  url: varchar('domain', { length: 512 }).notNull().default(''),
})

export const insertWorkSpaceSchema = createInsertSchema(workspace)
export const selectWorkSpaceSchema = createSelectSchema(workspace)
