export default function RequestsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-6 w-48 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Title and button skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-9 w-32 bg-gray-300 rounded animate-pulse" />
          <div className="h-10 w-40 bg-blue-200 rounded animate-pulse" />
        </div>

        {/* Request cards skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="h-7 w-48 bg-gray-300 rounded animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}