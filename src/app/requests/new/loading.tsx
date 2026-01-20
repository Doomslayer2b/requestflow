export default function NewRequestLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="h-9 w-64 bg-gray-300 rounded mb-6 animate-pulse" />

          <div className="space-y-6">
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-10 w-full bg-gray-100 rounded animate-pulse" />
            </div>

            <div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-32 w-full bg-gray-100 rounded animate-pulse" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 h-12 bg-blue-200 rounded animate-pulse" />
              <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}