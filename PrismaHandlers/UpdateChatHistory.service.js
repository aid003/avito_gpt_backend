import { prisma } from "../index.js";

export async function updateChatHistory(userId, role, content) {
  if (!userId || !role || !content) {
    throw new Error("ОШИБКА передачи данных для обновления истроии чата.");
  }
  try {
    await prisma.chats.create({
      data: { userId: userId, content: content, role: role },
    });
  } catch (error) {
    console.log(`ОШИБКА обновления чата для: ${userId} \n\n\n ${error}`);
  }

  console.log(`Обновил историю чата для -> ${userId}`);
}
