import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const data = [
  { title: 'music' },
  { title: 'films' },
  { title: 'travelling' },
  { title: 'sport' },
  { title: 'dogs' },
  { title: 'cats' },
];

async function main() {
  await prisma.shoppingPreference.createMany({ data });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
