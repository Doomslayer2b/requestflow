import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await auth()
  
  
  if (session?.user) {
    redirect('/requests')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          RequestFlow
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Internal request and approval system
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}