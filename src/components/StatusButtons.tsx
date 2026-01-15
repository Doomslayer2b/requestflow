'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type StatusButtonsProps = {
  requestId: string
  currentStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
}

export default function StatusButtons({ requestId, currentStatus }: StatusButtonsProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  async function updateStatus(newStatus: 'APPROVED' | 'REJECTED') {
    setIsUpdating(true)

    try {
      const res = await fetch(`/api/requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!res.ok) {
        throw new Error('Failed to update status')
      }

      // Refresh the page to show updated status
      router.refresh()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  // Don't show buttons if already approved or rejected
  if (currentStatus !== 'PENDING') {
    return null
  }

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => updateStatus('APPROVED')}
        disabled={isUpdating}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
      >
        {isUpdating ? 'Updating...' : 'Approve'}
      </button>
      <button
        onClick={() => updateStatus('REJECTED')}
        disabled={isUpdating}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
      >
        {isUpdating ? 'Updating...' : 'Reject'}
      </button>
    </div>
  )
}