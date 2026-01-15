import Link from 'next/link'
import { Request } from '@/types'
import StatusButtons from '@/components/StatusButtons' 

// This is a Server Component (runs on the server)
async function getRequests() {
  // In Next.js, you can fetch from your own API like this
  const res = await fetch('http://localhost:3000/api/requests', {
    cache: 'no-store', // Don't cache, always get fresh data
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch requests')
  }
  
  return res.json()
}

export default async function RequestsPage() {
  const requests = await getRequests()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Requests</h1>
          <Link
            href="/requests/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Request
          </Link>
        </div>

        <div className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-gray-500">No requests yet. Create one to get started!</p>
          ) : (
            
            requests.map((request: Request) => (
              <div
                key={request.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {request.title}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.status === 'APPROVED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{request.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Created by: {request.createdBy.name}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                </div>
                  <StatusButtons 
                  requestId={request.id} 
                  currentStatus={request.status} 
                  />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}