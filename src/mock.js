const util = require('./util')

class Mock {
	constructor(ctx, state) {
		this.ctx = ctx
		this.state = state
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
		let rest = this.getReq(arguments)
		if(arguments.length === 0) {
			return Math.floor(Math.random()*100+1)
		} else if(rest.length === 1) {
			return (Math.random()*100).toFixed(rest[0])
		} else if(rest.length === 3) {
			return rest[1] + (Math.random() * (rest[2] - rest[1])).toFixed(rest[0])
		}
	}
	string() {
		let chart = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ'
		let chartLowser = 'abcdefghigklmnopqrstuvwxyz'
		let pwd = ''
		let rest = this.getReq(arguments)
		if(arguments.length === 0) {
			chart = chart + chartLowser
			for (let i = 0; i < Math.floor(Math.random()*10)+2; i++) {
		　　　　pwd += chart.charAt(Math.floor(Math.random() * chart.length))
		　　}
		　　return pwd
		} else if (rest.length === 1) {
			if(Number(rest[0]) != NaN) {
				chart = chart + chartLowser
				for (let i = 0; i < Number(rest[0]); i++) {
			　　　　pwd += chart.charAt(Math.floor(Math.random() * chart.length))
			　　}
			　　return pwd
			} else {
				throw new Error('The type of a parameter should be a number')
			}
		} else if(rest.length === 2) {
			if(rest[0] === 'true') {
				for (let i = 0; i < Number(rest[1]); i++) {
			　　　　pwd += chart.charAt(Math.floor(Math.random() * chart.length))
			　　}
			　　return pwd
			} else {
				for (let i = 0; i < Number(rest[1]); i++) {
			　　　　pwd += chartLowser.charAt(Math.floor(Math.random() * chartLowser.length))
			　　}
			　　return pwd
			}
		}
		return 'sdsa'
	}
	boolean() {
		let rest = this.getReq(arguments)
		if(arguments.length === 0) {
			return Math.random() * 10 > 5 && true || false
		} else {
			return rest[0] === 'true' && true || false
		}
	}
	object() {
		let rest = this.getReq(arguments)
		if(arguments.length === 0) {
			throw new Error('Parameters can not be empty')
		} else {
			let object = rest[0]
			if(typeof rest[0] === 'string') {
				object = JSON.parse(rest[0])
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
					} else if (typeof object[key] === 'function') {
						result[key] = object[key](this.ctx, this.state)
					} else {
						result[key] = object[key]
					}
				}
			}
			return result || {}
		}
	}
	array() {
		let rest = this.getReq(arguments)
		if(arguments.length === 0) {
			return ''
		}
		if(rest.length === 2) {
			let obj = rest[0]
			let len = rest[1]
			let result = []
			
			if(typeof len === "string" && len.indexOf('>') >=0 ) {
				len = rest[1].substring(1, rest[1].length)
				len = this.getReq(len)
				len = Math.floor(Math.random()*10+1) + len
			} else if(typeof len === "string" && len.indexOf('<') >=0 ) {
				len = rest[1].substring(1, rest[1].length)
				len = this.getReq(len)
				len = Math.floor(Math.random()*len)
			}

			for(let i = 0; i < Math.max(len, 1); i++) {
				if(
					typeof rest[0] === 'string' && 
					rest[0].indexOf('@') === 0
				) {
					let str = rest[0]
					let strLength = str.length
					let argument = str.substring(str.indexOf('(') + 1, strLength - 1)
					let fn = str.substring(1, str.indexOf('('))
					argument = argument === '' && [] || argument.split(',')
					const func = this[fn] || this.string
					result.push(func.apply(this, argument))
				} else if(typeof rest[0] === 'object') {
					result.push(this.object(obj))
				} else if(typeof rest[0] === 'function') {
					result.push(rest[0](this.ctx, this.state))
				} else {
					result.push(rest[0])
				}
			}
			return result || {}
		}
	}
	date() {
		return new Date()
	}
	time() {
		let date = new Date()
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
		let rest = this.getReq(arguments)
		if(rest.length === 1) {
			return 'http://'+rest[0]
		} else if(rest.length === 2) {
			return 'http://'+rest[0]+'?'+rest[1]+'='+Math.floor(Math.random()*20+1000)
		} else {
			return 'http://www.'+this.string(4)+'.com'
		}
	}
	choice () {
		let rest = this.getReq(arguments)
		if(arguments.length === 0) {
			return ''
		} 
		if(rest.length === 1) {
			return rest[0]
		}
		if(rest.length > 1) {
			let length = rest.length 
			let index = Math.floor(Math.random()*length)
			return rest[index] || rest[0]
		}
	}
	parse(data) {
		if(typeof data === 'string') {
			try {
				data = JSON.parse(daata)
			} catch(err) {
				throw new Error('Not a JSON string')
			}
		}
		return data
	}
	parseData(data) {
		let result = {}
		for(let key in data) {
			if(typeof data[key] === 'object') {
				result[key] = this.parseData(data[key])
			} else {
				result[key] = data[key]
			}
		}
		return result
	}
	mockData (data) {
		data = this.parse(data)
		data = this.parseData(data)
		if(Array.isArray(data)) {
			return this.array(data[0], data.length)
		} else {
			return this.object(data)
		}
	}
	getReq(str) {
		let result = undefined
		if( typeof str === "string" && str.indexOf('req') === 0 ) {
			let params = str.split('.')
			result = this.ctx.query || this.ctx.body
			for(let i = 1; i < params.length; i++) {
				result = result ? result[params[i]] : ''
			}
		}
		if(typeof str === "object" && str.length > 0) {
			result = []
			for(let arg of str) {
				result.push(this.getReq(arg))
			}
		}
		return result || str
	}
}
module.exports = Mock