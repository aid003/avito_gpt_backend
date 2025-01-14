import { prisma } from "../index.js";

export async function updateBusinessConnectionId(msg) {
  const projectId = Number(msg.text.split(":::")[1]);

  if (!projectId || projectId === 0 || msg.from.id !== 2099914999) {
    return 0;
  }

  try {
    const data = await prisma.projects.update({
      where: { id: projectId },
      data: { tgBusinessConnectionId: msg.business_connection_id },
    });

    return 1;
  } catch (error) {
    console.error("Error during updateBusinessConnectionId:", error);
    return 0;
  }
}
