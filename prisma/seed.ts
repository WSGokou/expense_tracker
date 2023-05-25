import {PrismaClient} from '@prisma/client';
import {hash} from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const password = await hash('Password123', 10);
  await prisma.user.upsert({
    where: {email: 'test@test.com'},
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test user',
      password,
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
