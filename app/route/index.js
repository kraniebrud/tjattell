const Joi = require('joi')
const Boom = require('boom')
const app = require(`${__app}`)
const handler = require('./handler')

const io = require('socket.io')(app.select('chat').listener)

const Addon = require(`${__app}/addon`)

app.route({
	method: ['POST'],
	path: '/chat/message',
	config: {
		pre: Addon.action('CHAT_MESSAGE')
	},
	handler: handler.chat.message(io)
})

app.route({
	method: ['post'],
	path: '/chat/join',
	config: {
		pre: Addon.action('CHAT_JOIN')
	},
	handler: handler.chat.join(io)
})