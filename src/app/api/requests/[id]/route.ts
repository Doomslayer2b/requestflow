import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      )
    }

    
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Only admins can approve or reject requests' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { status } = body
    
    const { id } = await params

    const validStatuses = ['PENDING', 'APPROVED', 'REJECTED']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be PENDING, APPROVED, or REJECTED' },
        { status: 400 }
      )
    }

    const existingRequest = await prisma.request.findUnique({
      where: { id },
    })

    if (!existingRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      )
    }


    const oldStatus = existingRequest.status

    
    const [updatedRequest] = await prisma.$transaction([
      
      prisma.request.update({
        where: { id },
        data: { status },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      
      prisma.auditLog.create({
        data: {
          action: status, 
          userId: session.user.id,
          requestId: id,
          oldStatus,
          newStatus: status,
        },
      }),
    ])

    return NextResponse.json(updatedRequest)
  } catch (error) {
    console.error('Error updating request:', error)
    return NextResponse.json(
      { error: 'Failed to update request' },
      { status: 500 }
    )
  }
}