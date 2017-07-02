const Boom = require('boom')

const Addon = require(`${__app}/addon`)
 

module.exports = io => ( (request, reply) => {

	const username = request.payload.username
	const message = request.payload.message

	io.emit('CHAT_MESSAGE', {username, message})

	reply({})

})