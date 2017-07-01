require('dotenv').config()

const hapi = require('hapi')
const inert = require('inert')

const server = new hapi.Server()
server.connection({port: process.env.CHAT_PORT, labels: ['chat']})

server.register(require('inert'), (err) => {
	server.route({
		method: ['GET'], 
		path: '/',
		handler: function(request, reply){
			reply.file('./public/www/chat.html')
		}
	})

	// SERVE STATIC FILES
	server.route({
		method: 'GET',
		path: '/assets/{filename*}',
		handler: {
			directory: {
				path: './public/www/assets/',
				listing: false,
				index: false
			}
		}
	})

	server.start( err => {
		if(err) throw err
		console.log('server: ', server.info.port)
	})

	require('./routes')

})

module.exports = server