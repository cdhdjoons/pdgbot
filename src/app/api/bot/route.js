require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "Enter the Cockpit", web_app: { url: "https://jetfuelgame.vercel.app/" } }],  // 게임 링크 수정
      [{ text: "Follow X", url: "https://x.com/JFT_official_X" }],
      [{ text: "Join Official Telegram", url: "https://t.me/Official_JetFuel" }],
    ],
  };

  const message = `
✨ Welcome, Pilot! ✈️🔥

The skies are calling, and JetFuel is ready for takeoff! You’ve been chosen to engage in high-speed aerial combat, outmaneuver rivals, and rise to the top of the ranks. Fuel your flight, earn rewards, and dominate the skies!

🔥 What you can do here:
✈️ Engage in intense dogfights and aerial battles
🏆 Earn JTF tokens through Play-to-Earn combat
🌍 Climb the leaderboards and become an elite pilot

🚀 Your mission begins now! Tap below to start your journey.
  `;

  const pngUrl = 'https://jetfuelbot.vercel.app/jetfuelpic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

