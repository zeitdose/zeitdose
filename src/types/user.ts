export type DatabaseUser = {
  id: number
  username: string
  email?: string
  avatarUrl?: string
  hashedPassword?: string
  reminder: 'system' | 'email' | 'telegram' | 'matrix'
  remindBefore: number
  createdAt: Date
  updatedAt: Date
  workspaceId: number
}
