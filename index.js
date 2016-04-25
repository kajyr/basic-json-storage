'use strict';

const fs = require('fs');

let exists = (file) => {
	try {
		return fs.statSync(file);
	} catch (e) {
		return false;
	}
}



let write = (file, data) => {
	let json = JSON.stringify(data, null, 2);
	return fs.writeFileSync(file, json, 'utf8');
}

module.exports = (file) => {
	if (!file) { throw new Error("the file name is required"); }

	let data;

	try {
		data = JSON.parse(fs.readFileSync(file, 'utf-8'));
	} catch (e) {
		data = {}
	}


	let get = (key, def) => {
		return new Promise((resolve, reject) => {
			if (def && !data[key]) {
				return resolve(def)
			}
			return resolve(data[key]);
		})
	};


	let set = (key, value) => {
		return new Promise((resolve, reject) => {
			data[key] = value;
			try {
				write(file, data);
				return resolve(value);
			} catch (e) {
				return reject(e);
			}
			
		})
	}


	return {
		get: get,
		set: set
	}

}
