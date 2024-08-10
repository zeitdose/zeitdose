export interface DatabaseUser {
  avatarUrl?: string
  createdAt: Date
  email?: string
  hashedPassword?: string
  id: number
  remindBefore: number
  reminder: 'email' | 'matrix' | 'system' | 'telegram'
  updatedAt: Date
  username: string
  workspaceId: number
}
