const app = require(`${__app}`)

const template = process.env.TEMPLATE

const tpath = `./app/public/www/template/${template ? template : 'default'}`

app.route({
	method: ['GET'], 
	path: '/',
	handler: function(request, reply){
		reply.file(`${tpath}/chat.html`)
	}
})

app.route({
	method: 'GET',
	path: '/assets/{filename*}',
	handler: {
		directory: {
			path: `${tpath}/assets/`,
			listing: false,
			index: false
		}
	}
})