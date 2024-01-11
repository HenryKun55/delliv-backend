import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const thePassword = '123456';
  const hashedPassword = await bcrypt.hash(thePassword, 10);

  const establishment = await prisma.establishment.create({
    data: {
      name: 'establishment',
      location: 'Belo Jardim - PE',
    },
  });

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      role: Role.ESTABLISHMENT,
      establishmentId: establishment.id,
    },
  });

  const deliveryMan = await prisma.user.create({
    data: {
      username: 'delivery',
      password: hashedPassword,
      role: Role.DELIVERY_MAN,
      establishmentId: establishment.id,
    },
  });

  const order = await prisma.order.create({
    data: {
      customerName: 'PH',
      userId: admin.id,
      establishmentId: establishment.id,
    },
  });

  console.log({ establishment, admin, deliveryMan, order });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
