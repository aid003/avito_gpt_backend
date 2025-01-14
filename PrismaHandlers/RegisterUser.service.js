import { prisma } from "../index.js";

export async function registerUser({
  name = null,
  sourceCreation = null,
  avitoId = null,
  tgId = null,
  otherId = null,
  projectId = null,
} = {}) {
  if (avitoId !== null) {
    try {
      const user = await prisma.users.create({
        data: {
          name: name ? name : "Не указано",
          sourceCreation: sourceCreation ? sourceCreation : "Не указано",
          avitoId: avitoId.toString(),
          projectId: projectId ? Number(projectId) : null,
        },
      });

      console.log(`Зарегистрировал нового пользователя -> ${name}`);
      return user;
    } catch (error) {
      console.log(
        `ОШИБКА регистрации пользователя для: ${name} \n\n\n ${error}`
      );
    }
  } else if (tgId !== null) {
    try {
      const user = await prisma.users.create({
        data: {
          name: name ? name : "Не указано",
          sourceCreation: sourceCreation ? sourceCreation : "Не указано",
          tgId: tgId.toString(),
          projectId: projectId ? Number(projectId) : null,
        },
      });

      console.log(`Зарегистрировал нового пользователя -> ${name}`);
      return user;
    } catch (error) {
      console.log(
        `ОШИБКА регистрации пользователя для: ${name} \n\n\n ${error}`
      );
    }
  } else if (otherId !== null) {
    try {
      const user = await prisma.users.create({
        data: {
          name: name ? name : "Не указано",
          sourceCreation: sourceCreation ? sourceCreation : "Не указано",
          otherId: otherId.toString(),
          projectId: projectId ? Number(projectId) : null,
        },
      });

      console.log(`Зарегистрировал нового пользователя -> ${name}`);
      return user;
    } catch (error) {
      console.log(
        `ОШИБКА регистрации пользователя для: ${name} \n\n\n ${error}`
      );
      return 0;
    }
  } else {
    console.log(
      `Пользователь не зарегистрирован, для: ${name} \n\n\n ${error}`
    );
    return 0;
  }
}
