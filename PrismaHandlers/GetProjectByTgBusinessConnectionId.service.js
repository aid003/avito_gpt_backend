import { prisma } from "../index.js";

export async function GetProjectByTgBusinessConnectionId(
  tgBusinessConnectionId
) {
  if (!tgBusinessConnectionId) {
    return 0;
  }

  try {
    const project = await prisma.projects.findUnique({
      where: {
        tgBusinessConnectionId: tgBusinessConnectionId,
      },
      include: {
        users: true,
        prompts: true,
      },
    });

    console.log(`Получил данные проекта -> ${project.name}`);
    return project;
  } catch (error) {
    console.log(`ОШИБКА получения проекта:\n\n ${error}`);
    return 0;
  }
}
