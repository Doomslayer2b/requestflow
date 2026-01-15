import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const body = await request.json()
    const { email, name, role } = body

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role: role || 'USER', // Default to USER if not specified
      },
    })

    // Return the created user
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    // Handle errors (e.g., duplicate email)
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}