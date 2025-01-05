export interface DatabaseUser {
  avatarUrl: string | null
  createdAt: Date
  email: string | null
  hashedPassword: string | null
  id: number
  remindBefore: number | null
  reminder: 'email' | 'matrix' | 'system' | 'telegram' | null
  updatedAt: Date | null
  username: string
  workspaceId: number | null
}
