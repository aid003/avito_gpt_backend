import { prisma } from "../index.js";

export async function getProjectById(projectId) {
  if (!projectId) {
    console.log("Ошибка поиска проекта. Не переданы данные для поиска.");
    return 0;
  }

  try {
    const project = await prisma.projects.findUnique({
      where: {
        id: Number(projectId),
      },
      include: {
        prompts: true,
        users: true,
        vectorCollections: true,
      },
    });

    console.log(`Получил полные данные проекта -> ${project.name}`);
    return project;
  } catch (error) {
    console.log(`ОШИБКА получения данных проекта:\n\n ${error}`);
    return 0;
  }
}
