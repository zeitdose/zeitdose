export interface DatabaseUser {
  avatarUrl: null | string
  createdAt: Date
  email: null | string
  hashedPassword: null | string
  id: number
  remindBefore: null | number
  reminder: 'email' | 'matrix' | 'system' | 'telegram' | null
  updatedAt: Date | null
  username: string
  workspaceId: null | number
}
