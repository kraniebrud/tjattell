const fs = require('fs')
const Promise = require('bluebird')

const getAddonsWithinDir = addonDir => 
	new Promise( (resolve, reject) => {
		fs.readdir( addonDir, ( (err, addons) => {
			err ? reject(err) : resolve( addons.map( 
				addonItem => require(`${addonDir}/${addonItem}`) 
			))
		}))
	})

async function getAddons () {
	return await Promise
		.all([
			getAddonsWithinDir(`${__dirname}/builtin`),
			getAddonsWithinDir(`${__dirname}/custom`)	
		])
		.spread( (builtin, custom) => {
			return Object.assign(builtin, custom)
		})
}

function Addon() {
	this.collection = []

	this.action = ( ( method, io ) => this.collection
		.filter( addon => {
			if( addon [method] !== undefined ) {
				return typeof addon [method] === 'function'	
			}else {
				return false
			}
		})
		.map( action => ( {method : action [method] } ))
	)
	
	this.init = async () => await getAddons()
		.then( coll => this.collection = Object.freeze(coll) )
	
}

module.exports = new Addon()