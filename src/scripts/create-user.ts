import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@test.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    }
  })
  
  const user = await prisma.user.create({
    data: {
      email: 'user@test.com',
      name: 'Regular User',
      password: hashedPassword,
      role: 'USER',
    }
  })
  
  console.log('✅ Created users:')
  console.log('Admin:', admin.email, '- password: password123')
  console.log('User:', user.email, '- password: password123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())