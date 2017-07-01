const Boom = require('boom')

module.exports = io => ( (request, reply) => {
	const username = request.payload.username
	reply({})
	io.emit('CHAT_JOIN', {username})
})