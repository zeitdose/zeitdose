export interface PostgreSQLError extends Error {
  code?: string
  column?: string
  constraint?: string
  dataType?: string
  detail?: string
  file?: string
  hint?: string
  internalPosition?: string
  internalQuery?: string
  line?: string
  position?: string
  routine?: string
  schema?: string
  table?: string
  where?: string
}
