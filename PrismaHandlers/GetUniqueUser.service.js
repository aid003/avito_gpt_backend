import { prisma } from "../index.js";

export async function getUniqueUser(userId) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        userId: userId,
      },
    });

    console.log(`Получил уникального пользователя -> ${user.userId}`);
    return user;
  } catch (error) {
    console.log(`ОШИБКА получения уникального пользователя:\n\n ${error}`);
    return 0;
  }
}
