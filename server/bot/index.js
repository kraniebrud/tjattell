const cleverbot = require('cleverbot.io')
const bot = new cleverbot(process.env.CHAT_BOT_USER, process.env.CHAT_BOT_KEY)
bot.setNick(process.env.CHAT_BOT_NICK)
bot.create( (err, session) => {
	if(err) throw new Error(err)
})

module.exports = bot