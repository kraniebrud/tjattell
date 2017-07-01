const Boom = require('boom')

const bot = require(`${__app}/bot`)

module.exports = io => ( (request, reply) => {
	const username = request.payload.username
	const message = request.payload.message

	io.emit('CHAT_MESSAGE', {username, message})

	bot.ask(message, (err, response) => {
		if(err) {
			console.error(err)
			return reply(Boom.serverUnavailable())
		}
		reply({})
		io.emit('CHAT_MESSAGE', {username: process.env.CHAT_BOT_NICK, message: response})
	})
})