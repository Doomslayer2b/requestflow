import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


// GET /api/requests - Fetch all requests with creator info
export async function GET() {
  try {
    const requests = await prisma.request.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}

// POST /api/requests - Create new request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, createdById } = body

    // Validation
    if (!title || !description || !createdById) {
      return NextResponse.json(
        { error: 'Title, description, and createdById are required' },
        { status: 400 }
      )
    }

    // Verify the user exists before creating request
    const userExists = await prisma.user.findUnique({
      where: { id: createdById },
    })

    if (!userExists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create the request
    const newRequest = await prisma.request.create({
      data: {
        title,
        description,
        createdById,
      },
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
    })

    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json(
      { error: 'Failed to create request' },
      { status: 500 }
    )
  }
}
