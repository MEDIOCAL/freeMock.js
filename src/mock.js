const util = require('./util')

class Mock {
	constrcutor(ctx) {
		this.ctx = ctx
	}
    name() {
		const surname = util.surname
		const names = util.names
		return surname[Math.floor(Math.random()*surname.length)] + names[Math.floor(Math.random()*names.length)]
	}
	title() {
		return String.fromCodePoint(Math.round(Math.random() * 20901) + 19968)
	}
	number() {
		if(arguments.length === 0) {
			return Math.floor(Math.random()*100+1)
		} else if(arguments.length === 1) {
			return (Math.random()*100).toFixed(arguments[0])
		} else if(arguments.length === 3) {
			return arguments[1]+(Math.random()*(arguments[2]-arguments[1])).toFixed(arguments[0])
		}
		
	}
	string() {
		let chart = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ'
		let chartLowser = 'abcdefghigklmnopqrstuvwxyz'
		let pwd = ''

		if(arguments.length === 0) {
			chart = chart + chartLowser
			for (let i = 0; i < Math.floor(Math.random()*10)+2; i++) {
		　　　　pwd += chart.charAt(Math.floor(Math.random() * chart.length))
		　　}
		　　return pwd
		} else if (arguments.length === 1) {
			if(Number(arguments[0]) != NaN) {
				chart = chart + chartLowser
				for (let i = 0; i < Number(arguments[0]); i++) {
			　　　　pwd += chart.charAt(Math.floor(Math.random() * chart.length))
			　　}
			　　return pwd
			} else {
				throw new Error('The type of a parameter should be a number')
			}
		} else if(arguments.length === 2) {
			if(arguments[0] === 'true') {
				for (let i = 0; i < Number(arguments[1]); i++) {
			　　　　pwd += chart.charAt(Math.floor(Math.random() * chart.length))
			　　}
			　　return pwd
			} else {
				for (let i = 0; i < Number(arguments[1]); i++) {
			　　　　pwd += chartLowser.charAt(Math.floor(Math.random() * chartLowser.length))
			　　}
			　　return pwd
			}
		}
		return 'sdsa'
	}
	boolean() {
		if(arguments.length === 0) {
			return Math.random() * 10 > 5 && true || false
		} else {
			return arguments[0] === 'true' && true || false
		}
	}
	object() {
		if(arguments.length === 0) {
			throw new Error('Parameters can not be empty')
		} else {
			let object = arguments[0]
			if(typeof arguments[0] === 'string') {
				object = JSON.parse(arguments[0])
			}
			let result = {}
			for(let key in object) {
				if(object.hasOwnProperty(key)) {
					if(key.indexOf('|') > 0) {
						let keys = key.split('|')
						let l = keys[1]
						let k = keys[0]
						result[k] = this.array(object[key], l)
					} else if (
						typeof object[key] === 'string' && 
						object[key].indexOf('@') === 0
					) {
						let str = object[key]
						let strLength = str.length
						let argument = str.substring(str.indexOf('(') + 1, strLength - 1)
						let fn = str.substring(1, str.indexOf('('))
						argument = argument === '' && [] || argument.split(',')
						const func = this[fn] || this.string
						result[key] = func.apply(this, argument)
					} else if (typeof object[key] === 'object') {
						result[key] = this.object(object[key])
					} else {
						result[key] = object[key]
					}
				}
			}
			return result
		}
	}
	array() {
		if(arguments.length === 0) {
			return ''
		}
		if(arguments.length === 2) {
			let obj = arguments[0]
			let len = arguments[1]
			let result = []

			if(arguments[1].indexOf('>') >=0 ) {
				len = arguments[1].substring(1, arguments[1].length)
				len = Math.floor(Math.random()*10+1) + len
			} else if(arguments[1].indexOf('<') >=0 ) {
				len = arguments[1].substring(1, arguments[1].length)
				len = Math.floor(Math.random()*len)
			}

			for(let i = 0; i < Math.max(len, 1); i++) {
				if(
					typeof arguments[0] === 'string' && 
					arguments[0].indexOf('@') === 0
				) {
					let str = arguments[0]
					let strLength = str.length
					let argument = str.substring(str.indexOf('(') + 1, strLength - 1)
					let fn = str.substring(1, str.indexOf('('))
					argument = argument === '' && [] || argument.split(',')
					const func = this[fn] || this.string
					result.push(func.apply(this, argument))
				} else if(typeof arguments[0] === 'object') {
					result.push(this.object(obj))
				} else {
					result.push(arguments[0])
				}
			}
			return result
		}
	}
	date() {
		return new Date()
	}
	time() {
		let date = new Date()
		date = date
		return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
	}
	email() {
		return this.string()+'@'+this.string(4)+'.com'
	}
	city() {
		const citys = util.city
		return citys[Math.floor(Math.random()*citys.length)]
	}
	province() {
		const provinces = util.province
		return provinces[Math.floor(Math.random()*provinces.length)]
	}
	county() {
		const countys = util.county
		return countys[Math.floor(Math.random()*countys.length)]
	}
	url() {
		if(arguments.length === 1) {
			return 'http://'+arguments[0]
		} else if(arguments.length === 2) {
			return 'http://'+arguments[0]+'?'+arguments[1]+'='+Math.floor(Math.random()*20+1000)
		} else {
			return 'http://www.'+this.string(4)+'.com'
		}
	}
	choice () {
		if(arguments.length === 0) {
			return ''
		} 
		if(arguments.length === 1) {
			return arguments[0]
		}
		if(arguments.length > 1) {
			let length = arguments.length 
			let index = Math.floor(Math.random()*length)
			return arguments[index] || arguments[0]
		}
	}
}
module.exports = Mock