const Boom = require('boom')

module.exports = ( (io, addon) => ( (request, reply) => {
	const username = request.payload.username
	const message = request.payload.message

	io.emit('CHAT_MESSAGE', {username, message})
	
	addon.addons.then( a => addon.actions(a))

	reply({})

}))