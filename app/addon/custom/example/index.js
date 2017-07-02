function Example () {
	
	//	This is an example on how make a custom addon
	//	To activate this addon uncomment the line of code that you see below 

	// this.assign = 'message'
 
	// this.position = 1

	this.CHAT_MESSAGE = (( request, reply) => {
		const payload = request.payload
		const message = payload.message.toUpperCase().replace('A', '∀')

		reply(message)
	})
}

module.exports = new Example