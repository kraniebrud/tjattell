(function (){

	var ele = {
		chatNameWindow: document.querySelector('#chooseChatNameWindow'),
		chatNameForm: document.querySelector('#chatNameForm'),
		chatMessageForm: document.querySelector('#chatMessageForm'),
		chatMessages: document.querySelector('#messages'),
		chatErrorWindow:  document.querySelector('#chatErrorWindow')
	}

	function produceChatErrorWindow(err) {
		var elem = ele.chatErrorWindow
		elem.innerHTML = '<h1>'+err+'</h1>'
		elem.className = 'open'
		setTimeout(function(){
			elem.className = ''
		}, 4750)
	}

	function Req () {
		var reqCallback
		var xmlHttp = new XMLHttpRequest()
		xmlHttp.onreadystatechange = function () {  
			if (xmlHttp.readyState === 4) {
				var statusText = xmlHttp.statusText
				if(xmlHttp.status === 200){
					if(typeof reqCallback === 'function') reqCallback()
				}
				else if(xmlHttp.status >= 500) {
					produceChatErrorWindow('Sorry, but Beastie is outta here.')
				}
				else {
					if(xmlHttp.response){
						var message = JSON.parse(xmlHttp.response).message
					} 	
					produceChatErrorWindow(message ? message : statusText)
				}
			}
		}
		function reqSend(data){
			xmlHttp.setRequestHeader('Content-Type', 'application/json')
			xmlHttp.send(data ? JSON.stringify(data) : null)
		}
		this.open = function(method, url, data, cb){
			reqCallback = cb
			xmlHttp.open(method, url, true)
			reqSend(data)
		}
	}

	var req = new Req()

	function Bot (){
		this.status = function(){
			req.open('get', '/chat/status', {})
		}
		this.message = function(username, message){
			req.open('post', '/chat/message', {username: username, message: message})
		}
	}

	var bot = new Bot()

	function sendMessage(e){
		e.preventDefault()
		var formElems = this.elements
		var message = formElems.message.value
		bot.message(username, message)
	}

	var username = 'Anon' // default
	ele.chatNameForm.addEventListener('submit', function(event){
		event.preventDefault()
		var self = this
		var chosenUsername = this.querySelector('[name=username]').value
		if(chosenUsername.length > 0) username = chosenUsername 
		
		req.open('post', '/chat/join', {username: username}, function(){
			self.parentElement.className = 'closed'
		})
	})


	ele.chatMessageForm.addEventListener('submit', function(event){
		event.preventDefault()
		var formElems = this.elements
		var message = this.message.value
		bot.message(username, message)
	})
	

	io().on('CHAT_MESSAGE', function(response){
		var elem = document.createElement('li')
		var usernameEle = document.createElement('b')
		var messageElem = document.createElement('p')

		var usernameText = document.createTextNode(response.username)
		var messageText = document.createTextNode(response.message)

		usernameEle.appendChild(usernameText)
		messageElem.appendChild(messageText)

		elem.appendChild(usernameEle)
		elem.appendChild(messageElem)
		ele.chatMessages.appendChild(elem)
	})
	
})()