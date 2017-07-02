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

function getAddons () {
	return Promise
		.all([
			getAddonsWithinDir(`${__dirname}/builtin`),
			getAddonsWithinDir(`${__dirname}/custom`)	
		])
		.spread( (builtin, custom) => {
			const customConstructors = custom.map ( c => c.constructor.name )

			// Custom will override builtin if of some constructor name
			let items = builtin
				.filter( addon => customConstructors.indexOf(addon.constructor.name) === -1 )
				.concat(custom)
				.sort( (currItem, nexItem) => currItem.position - nexItem.position)
			
			// Validations first
			let validationItems = items.filter ( 
				addon => 
					addon.assign !== undefined 
					&& addon.assign.toUpperCase() === 'VALIDATION' 
			)

			let otherItems = items.filter ( 
				addon => 
					addon.assign !== undefined 
					&& addon.assign.toUpperCase() !== 'VALIDATION' 
			)

			return validationItems.concat(otherItems)
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
		.map( action => ( {method : action [method], assign: action.assign} ))
	)
	
	this.init = () => getAddons()
		.then( collection => this.collection = Object.freeze(collection) )
	
}

module.exports = new Addon()