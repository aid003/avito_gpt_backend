import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

export let bot_tg;

export async function initializationTgBot(bot_token) {
  bot_tg = new TelegramBot(bot_token, {
    polling: {
      autoStart: true,
      interval: 200,
      offset: -1,
    },
  });

  try {
    bot_tg.on("polling_error", (err) => console.log(err.data.error.message));
    console.log(`🚀 Telegram полинг запущен в ${process.env.NODE_ENV} режиме.`);
  } catch (error) {
    console.error("Error during TgBot initialization:", error);
  }
}
