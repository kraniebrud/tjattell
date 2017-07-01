require('dotenv').config()
global.__app = __dirname

const hapi = require('hapi')
const inert = require('inert')

const app = new hapi.Server()
app.connection({port: process.env.CHAT_PORT, labels: ['chat']})

app.register(require('inert'), (err) => {
	app.route({
		method: ['GET'], 
		path: '/',
		handler: function(request, reply){
			reply.file('./app/public/www/chat.html')
		}
	})

	// SERVE STATIC FILES
	app.route({
		method: 'GET',
		path: '/assets/{filename*}',
		handler: {
			directory: {
				path: './app/public/www/assets/',
				listing: false,
				index: false
			}
		}
	})

	require('./route')

	app.start( err => {
		if(err) throw err
		console.log('app: ', app.info.port)
	})

})

module.exports = app