import Link from 'next/link'
import { Request } from '@/types'
import StatusButtons from '@/components/StatusButtons'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

async function getRequests(userId: string, role: string): Promise<Request[]> {
  const whereClause = role === 'ADMIN' 
    ? {} 
    : { createdById: userId }

  const requests = await prisma.request.findMany({
    where: whereClause,
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      auditLogs: {  
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return requests as Request[]
}

export default async function RequestsPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }
  
  const requests = await getRequests(session.user.id, session.user.role)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="text-lg font-semibold text-gray-900">
              {session.user.name} ({session.user.role})
            </p>
          </div>
<form action={async () => {
  'use server'
  const { signOut } = await import('@/lib/auth')
  await signOut()
}}>
  <button 
    type="submit"
    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
  >
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
    Sign Out
  </button>
</form>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Requests</h1>
          <Link
            href="/requests/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Request
          </Link>
        </div>

{requests.length === 0 ? (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
    <div className="max-w-sm mx-auto">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No requests yet
      </h3>
      <p className="text-gray-600 mb-6">
        {session.user.role === 'ADMIN'
          ? 'No requests have been created yet. Users can create requests that you can approve or reject.'
          : 'Get started by creating your first request. An admin will review it.'}
      </p>
      {session.user.role !== 'ADMIN' && (
        <Link
          href="/requests/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Your First Request
        </Link>
      )}
    </div>
  </div>
) : (
  <div className="space-y-4">
    {requests.map((request) => (
      <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
              request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
              request.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {request.status}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{request.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>Created by: {request.createdBy.name}</span>
          <span className="mx-2">•</span>
          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
        </div>
        {/* Audit log history */}
      {request.auditLogs && request.auditLogs.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">History:</p>
          <div className="space-y-1">
            {request.auditLogs.map((log) => (
              <p key={log.id} className="text-sm text-gray-600">
                <span className="text-gray-500">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
                {' - '}
                <span className="font-medium">{log.user.name}</span>
                {' '}
                {log.action === 'CREATED' 
                  ? 'created this request'
                  : log.action === 'APPROVED'
                  ? 'approved this request'
                  : 'rejected this request'}
              </p>
            ))}
          </div>
        </div>
      )}
        {session.user.role === 'ADMIN' && (
          <div className="mt-4">
            <StatusButtons 
              requestId={request.id} 
              currentStatus={request.status} 
            />
          </div>
        )}
      </div>
    ))}
  </div>
)}
      </div>
    </div>
  )
}