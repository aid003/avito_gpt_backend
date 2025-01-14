import { prisma } from "../index.js";

const MAX_CHAT_LENGTH = 20;
const SLICE_CHAT_LENGTH = 9;

export async function getSortedChat(userId) {
  if (!userId) {
    throw new Error("Ошибка получения чата. Не переданы параметры для поиска.");
  }

  try {
    const chat = await prisma.chats.findMany({
      where: {
        userId: userId,
      },
      select: {
        role: true,
        content: true,
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    if (chat.length > MAX_CHAT_LENGTH) {
      return chat.slice(-SLICE_CHAT_LENGTH);
    }

    console.log(`Получил историю чата для -> ${userId}`);
    return chat;
  } catch (error) {
    console.log(`ОШИБКА получения истории чата для: ${userId} \n\n\n ${error}`);
  }
}
