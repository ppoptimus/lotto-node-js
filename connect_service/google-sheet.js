const axios = require('axios')

const sheet_get = {
	method: 'get',
	url: 'https://sheet.best/api/sheets/20fb8e0a-72b1-4246-b7c3-9fb830f0451a?=',
	headers: {
		'X-Api-Key': '7lg4ZCujpS$PBm!OVwyBNyYs%KvnNt_6YkWI14L8u-No!lL6#ehQsZsaCTmEcvTk',
	},
	timeout: 5000,
}

const sheet_post = {
	url: 'https://sheet.best/api/sheets/20fb8e0a-72b1-4246-b7c3-9fb830f0451a',
	config: {
		headers: {
			'X-Api-Key': '7lg4ZCujpS$PBm!OVwyBNyYs%KvnNt_6YkWI14L8u-No!lL6#ehQsZsaCTmEcvTk',
			'Content-Type': 'application/json',
		},
		timeout: 10000,
	},
}

const post_to_sheet = async (data) => {
	const result = await axios.post(sheet_post.url, data, sheet_post.config)
	return result
}


module.exports = { sheet_get, sheet_post, post_to_sheet }
