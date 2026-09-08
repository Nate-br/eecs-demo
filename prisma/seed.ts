import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const userCount = await prisma.user.count()
  if (userCount > 0) {
    console.log('Database already seeded. Skipping...')
    return
  }

  // Create modules
  const modules = [
    {
      titleEn: "Secure API Coding",
      titleAm: "ደህንነቱ የተጠበቀ ኤፒአይ ኮዲንግ",
      description: "Learn the fundamentals of securing Enterprise APIs against OWASP Top 10 vulnerabilities.",
      target: "Developer"
    },
    {
      titleEn: "Social Engineering",
      titleAm: "ማህበራዊ ምህንድስና",
      description: "Identify and prevent common social engineering tactics used against HR and support staff.",
      target: "HR"
    },
    {
      titleEn: "Phishing Awareness",
      titleAm: "የማስገር ጥቃት ግንዛቤ",
      description: "How to spot and report malicious emails designed to steal credentials.",
      target: "Employee"
    },
    {
      titleEn: "Enterprise Security Basics",
      titleAm: "የድርጅት ደህንነት መሰረታዊ ነገሮች",
      description: "A mandatory baseline course for all employees covering physical and digital security.",
      target: "All"
    }
  ]

  for (const mod of modules) {
    await prisma.module.create({ data: mod })
  }

  // Create mock users
  await prisma.user.create({
    data: {
      email: 'admin@eecs.com',
      name: 'Admin User',
      role: 'Admin',
      passwordHash: 'dummy_hash_for_mvp',
      enterpriseId: '11111111-1111-1111-1111-111111111111',
      enterpriseName: 'Awash Bank'
    }
  })

  await prisma.user.create({
    data: {
      email: 'employee@eecs.com',
      name: 'Standard Employee',
      role: 'Employee',
      passwordHash: 'dummy_hash_for_mvp',
      enterpriseId: '11111111-1111-1111-1111-111111111111',
      enterpriseName: 'Awash Bank'
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
