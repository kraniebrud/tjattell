const Joi = require('joi')
const Boom = require('boom')

const schema = Joi.object()
	.keys({
		username: Joi.string().alphanum().min(2).max(16).required(),
		message: Joi.string().min(1).max(160)
	})
	.with('message', 'username')

const validateRequest = ( (request, reply) => {
	const payload = request.payload
	const {error} = Joi.validate(payload, schema)

	if(error) return reply(Boom.badData(error)) 

	reply({error})
})

function Validation () {
	this.assign = 'validation'
	this.CHAT_JOIN = validateRequest
	this.CHAT_MESSAGE = validateRequest
}

module.exports = new Validation