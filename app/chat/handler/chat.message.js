const Boom = require('boom')

const Addon = require(`${__app}/addon`)
 

module.exports = io => ( (request, reply) => {
	
	const {username, message} = request.payload
	const addon = request.pre
	
	io.emit('CHAT_MESSAGE',  Object.assign( {username, message}, addon ) )

	reply({})

})