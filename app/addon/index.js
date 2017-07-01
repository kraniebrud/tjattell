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
			return builtin.concat(custom)
		})
}

const actions = addons => {
	addons.forEach( action => {
		console.log(Object.keys(action))
	})
}

module.exports = {getAddons, actions}