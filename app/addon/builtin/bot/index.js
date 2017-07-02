const cleverbot = require('cleverbot.io')
const bot = new cleverbot(process.env.CHAT_BOT_USER, process.env.CHAT_BOT_KEY)

bot.setNick(process.env.CHAT_BOT_NICK)
bot.create( (err, session) => {
	if(err) throw new Error(err)
})

function AddonBot () {
/*	console.log('req')
	console.log('req')
	console.log('req')
	console.log(request)*/
/*
	this.CHAT_MESSAGE = ((request, reply) => {
		request.payload.message = 'GOTCHA!'
		reply(request.payload)
	})
*/
	/*
	this.CHAT_MESSAGE = ( (username, message) => {
		console.log('BOT CAUGHT IT')
		console.log('username')
		console.log(username)
		console.log('message')
		console.log(message)
	})
	*/
}

module.exports = new AddonBot