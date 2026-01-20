export type User = {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  createdAt: string
}

export type AuditLog = {
  id: string
  action: string
  userId: string
  requestId: string
  oldStatus: string | null
  newStatus: string | null
  createdAt: string
  user: {
    name: string
  }
}

export type Request = {
  id: string
  title: string
  description: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
  updatedAt: string
  createdById: string
  createdBy: User
  auditLogs: AuditLog[]
}