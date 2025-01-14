import { registerUser } from "../PrismaHandlers/RegisterUser.service.js";
import { updateChatHistory } from "../PrismaHandlers/UpdateChatHistory.service.js";
import { makeFirstRequest } from "../ChatgptHandlers/MakeGptFirstRequest.service.js";
import { makeHistoryRequest } from "../ChatgptHandlers/MakeGptHistoryRequest.service.js";
import { getSortedChat } from "../PrismaHandlers/GetSortedChat.service.js";
import { makeHintRequest } from "../Distributor/Middleware/MakeHintRequest.service.js";
import { makeHintHistotyRequest } from "../Distributor/Middleware/MakeHintHisoryRequest.service.js";
import { updateBusinessConnectionId } from "./UpdateBusinessConnectionId.js";
import { GetProjectByTgBusinessConnectionId } from "../PrismaHandlers/GetProjectByTgBusinessConnectionId.service.js";
import { findUniqueTelegramUser } from "../PrismaHandlers/FindUniqueTelegramUser.service.js";

export async function businessMessengerHandler(bot_tg) {
  bot_tg.on("business_message", async (msg) => {
    const isRegisterBusinessToken = await updateBuisinessTokenHandler(
      bot_tg,
      msg
    );
    if (!isRegisterBusinessToken) {
      return;
    }

    const project = await GetProjectByTgBusinessConnectionId(
      msg.business_connection_id
    );
    if (!project || !project.status) {
      await bot_tg.sendMessage(
        msg.from.id,
        "Проект не найден, обновите бизнес идентификатор или проект отключен администратором.",
        {
          business_connection_id: msg.business_connection_id,
        }
      );
      return;
    }

    let user;
    let wasUserRegistred = true;
    user = await findUniqueTelegramUser({
      tgId: msg.from.id,
      projectId: project.id,
    });
    if (!user) {
      const register = await registerUser({
        name: msg.from.first_name ? msg.from.first_name : null,
        sourceCreation: "telegram",
        tgId: msg.from.id,
        projectId: project.id,
      });

      if (register === 0) {
        return;
      } else {
        user = register;
        wasUserRegistred = false;
      }
    }

    // msg.text  msg.voice  msg.sticker.emoji  msg.video_note  msg.document  msg.

    if (msg?.text || msg?.sticker?.emoji) {
      const userMessage = msg.text ? msg.text : msg.sticker?.emoji;

      if (wasUserRegistred) {
        if (project.isUsingRag) {
          await withRigisterWithRag(bot_tg, msg, project, user, userMessage);
        } else {
          await withRigisterWithoutRag(bot_tg, msg, project, user, userMessage);
        }
      } else {
        if (project.isUsingRag) {
          await withoutRigisterWithRag(bot_tg, msg, project, user, userMessage);
        } else {
          await withoutRigisterWithoutRag(
            bot_tg,
            msg,
            project,
            user,
            userMessage
          );
        }
      }
    } else {
      await unknownFormatHandler(bot_tg, msg, project);
    }
  });
}

async function updateBuisinessTokenHandler(bot_tg, msg) {
  if (
    msg.text &&
    msg.text.includes("[x2jer3ic9wpdww02]_update_business_connection_id")
  ) {
    const response = await updateBusinessConnectionId(msg);
    if (Boolean(response)) {
      await bot_tg.sendMessage(msg.from.id, "Business connection id updated", {
        business_connection_id: msg.business_connection_id,
      });
      return 0;
    } else {
      await bot_tg.sendMessage(
        msg.from.id,
        "Error updating business connection id",
        {
          business_connection_id: msg.business_connection_id,
        }
      );
      return 0;
    }
  } else {
    return 1;
  }
}

async function withRigisterWithRag(bot_tg, msg, project, user, userMessage) {
  const answer = await makeHintHistotyRequest(
    userMessage,
    project.id,
    "telegram",
    user.userId
  );

  if (answer === 0) {
    return;
  }

  await bot_tg.sendMessage(msg.from.id, answer, {
    business_connection_id: msg.business_connection_id,
  });
}

async function withRigisterWithoutRag(bot_tg, msg, project, user, userMessage) {
  let prompt;
  let defaultPrompt;
  for (let i = 0; i < project.prompts.length; i++) {
    if (project.prompts[i].type === "telegram") {
      prompt = project.prompts[i].content;
    }
    if (project.prompts[i].type === "default") {
      defaultPrompt = project.prompts[i].content;
    }
  }

  const upgradedPromt = prompt ? prompt : defaultPrompt;

  const chatHistory = await getSortedChat(user.userId);

  const answer = await makeHistoryRequest(
    userMessage,
    upgradedPromt,
    chatHistory,
    project.gptModel
  );

  await updateChatHistory(user.userId, "user", userMessage);
  await updateChatHistory(user.userId, "assistant", answer.content);

  await bot_tg.sendMessage(msg.from.id, answer.content, {
    business_connection_id: msg.business_connection_id,
  });
}

async function withoutRigisterWithRag(bot_tg, msg, project, user, userMessage) {
  const answer = await makeHintRequest(
    userMessage,
    project.id,
    "telegram",
    user.userId
  );
  if (answer === 0) {
    return;
  }

  await bot_tg.sendMessage(msg.from.id, answer, {
    business_connection_id: msg.business_connection_id,
  });
}

async function withoutRigisterWithoutRag(
  bot_tg,
  msg,
  project,
  user,
  userMessage
) {
  let prompt;
  let defaultPrompt;
  for (let i = 0; i < project.prompts.length; i++) {
    if (project.prompts[i].type === "telegram") {
      prompt = project.prompts[i].content;
    }
    if (project.prompts[i].type === "default") {
      defaultPrompt = project.prompts[i].content;
    }
  }

  const upgradedPromt = prompt ? prompt : defaultPrompt;

  const answer = await makeFirstRequest(
    msg.text,
    upgradedPromt,
    project.gptModel
  );

  await updateChatHistory(user.userId, "user", userMessage);
  await updateChatHistory(user.userId, "assistant", answer.content);

  await bot_tg.sendMessage(msg.from.id, answer.content, {
    business_connection_id: msg.business_connection_id,
  });
}

async function unknownFormatHandler(bot_tg, msg, project) {
  await bot_tg.sendMessage(
    msg.from.id,
    project.fallbackMessage ? project.fallbackMessage : "))",
    {
      business_connection_id: msg.business_connection_id,
    }
  );
}
