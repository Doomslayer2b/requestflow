export type User = {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  createdAt: Date
}

export type AuditLog = {
  id: string
  action: string
  userId: string
  requestId: string
  oldStatus: string | null
  newStatus: string | null
  createdAt: Date
  user: {
    name: string
  }
}

export type Request = {
  id: string
  title: string
  description: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: Date
  updatedAt: Date
  createdById: string
  createdBy: User
  auditLogs: AuditLog[]
}