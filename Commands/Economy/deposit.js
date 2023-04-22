const fs = require("fs");
const config = require("../../config");
const eco = require("discord-mongoose-economy");
const ty = eco.connect(config.mongodb);

module.exports = {
  name: "deposit",
  desc: "deposit gold.",
  alias: ["deposit"],
  category: "Economy",
  react: "💵",
  start: async (Miku, m, { text, prefix, args }) => {
    if (!text) {
      return Miku.sendMessage(
        m.from,
        { text: `Baka!! Provide the 💰amount you want to deposit!` },
        { quoted: m }
      );
    }
    const user = m.sender;
    const cara = "cara";
    const num = parseInt(args[0]);
    const deposit = await eco.deposit(user, cara, num);
    if (deposit.noten) return m.reply("You can't deposit what you don't have.");

    await Miku.sendMessage(
      m.from,
      {
        image: fs.readFileSync("./Assets/Img/card.png"),
        caption: `\n⛩️ Sender: ${m.pushName}\n\n🍀Successfully Deposited 💴 ${deposit.amount} to your bank.\n`,
      },
      { quoted: m }
    );
  },
};
