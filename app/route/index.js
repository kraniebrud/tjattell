const Joi = require('joi')
const Boom = require('boom')
const app = require(`${__app}`)
const handler = require('./handler')

const io = require('socket.io')(app.select('chat').listener)

const {getAddons, actions} = require(`${__app}/addon`)

const addons = getAddons()

const validation = {
	username: Joi.string().min(2).max(16),
	message: Joi.string().min(1).max(160)
}

app.route({
	method: ['POST'],
	path: '/chat/message',
	config: {
		validate: {
			payload: {
				username: validation.username,
				message: validation.message
			}
		}
	},

	handler: handler.chat.message(io, {addons, actions})
})

app.route({
	method: ['post'],
	path: '/chat/join',
	config: {
		validate: {
			payload: {
				username: validation.username
			}
		},
	},
	handler: handler.chat.join(io)
})