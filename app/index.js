require('dotenv').config()
global.__app = __dirname

const hapi = require('hapi')
const inert = require('inert')
const Addon = require(`${__app}/addon`)

const app = new hapi.Server()
app.connection({port: process.env.CHAT_PORT, labels: ['chat']})

app.register(require('inert'), (err) => {

	require('./public/serv')

	Addon.init().then( () => require('./chat/serv') )
	
	app.start( err => {
		if(err) throw err
		console.log('app: ', app.info.port)
	})

})

module.exports = app