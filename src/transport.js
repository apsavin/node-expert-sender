var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var _ = require('lodash');

var global = {
	strictSSL: false,
	headers: {
		'content-type': 'text/xml'
	}
};

function makeRequest (method, url, body) {
	var options = _.extend(global, {
		method: method,
		url: url,
		body: body
	});

	return request(options).then(function (response) {
		var statusCode = response[0].statusCode;
		if (statusCode >= 200 && statusCode < 300) {
			return Promise.resolve('success');
		} else {
			// TODO: return error message from body
			throw new Error(statusCode);
		}
	});
}

module.exports = {
	post: makeRequest.bind(null, 'post')
};