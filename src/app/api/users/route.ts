import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    
    const body = await request.json()
    const { email, name, role } = body

    
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role: role || 'USER', 
      },
    })

    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}