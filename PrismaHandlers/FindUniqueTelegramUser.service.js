import { prisma } from "../index.js";

export async function findUniqueTelegramUser({ tgId, projectId } = {}) {
  if (!tgId || !projectId) {
    console.log("Ошибка поиска пользователя. Не переданы данные для поиска.");
    return 0;
  }

  try {
    const user = await prisma.users.findUniqueOrThrow({
      where: {
        tgId: tgId.toString(),
        projectId: Number(projectId),
      },
    });

    console.log(`Нашел пользователя по tgId: ${tgId}`);
    return user;
  } catch (error) {
    console.log(`Уникальный пользователь ${tgId} не найден.`);
    return 0;
  }
}
