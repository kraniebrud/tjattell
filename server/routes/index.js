const Joi = require('joi')
const Boom = require('boom')
const Promise = require('bluebird')

const server = require('../index')
const bot = require('../bot')

const io = require('socket.io')(server.select('chat').listener)

var validation = {
	username: Joi.string().min(2).max(16),
	message: Joi.string().min(1).max(160)
}

server.route({
	method: ['POST'],
	path: '/chat/message',
	config: {
		validate: {
			payload: {
				username: validation.username,
				message: validation.message
			}
		},
	},
	handler: ((request, reply) => {
		const username = request.payload.username
		const message = request.payload.message

		io.emit('CHAT_MESSAGE', {username, message})

		bot.ask(message, (err, response) => {
			let botAnswer = response
			if(err) {
				console.error(err)
				return reply(Boom.serverUnavailable())
			}
			reply({})
			io.emit('CHAT_MESSAGE', {username: 'BeastieBot', message: response})
		})
	
	})
})

server.route({
	method: ['post'],
	path: '/chat/join',
	config: {
		validate: {
			payload: {
				username: validation.username
			}
		},
	},
	handler: ((request, reply) => {
		const username = request.payload.username
		reply({})
		let message = `Hi there ${username}`
		io.emit('CHAT_MESSAGE', {username: 'BeastieBot', message})
	})
})