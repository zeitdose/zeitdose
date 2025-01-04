import type { InferModel } from 'drizzle-orm'

import type { journalTable } from '~/db/schema/journal'

export type Journal = InferModel<typeof journalTable>
export type InsertJournal = InferModel<typeof journalTable, 'insert'>
