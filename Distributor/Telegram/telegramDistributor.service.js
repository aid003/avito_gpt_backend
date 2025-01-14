import { bot_tg } from "../../Initialization/InitializationTgBot.js";
import { businessMessengerHandler } from "../../TgHandlers/BusinessMessengerHandler.js";

export async function telegramDistributor() {
  try {
    await businessMessengerHandler(bot_tg);

    console.log("🚀 Telegram distributor запущен.");
  } catch (error) {}
}
