const argon2 = require('argon2')
const axios = require('axios')

const config = {
	method: 'get',
	url: 'https://sheet.best/api/sheets/20fb8e0a-72b1-4246-b7c3-9fb830f0451a?=',
	headers: {
		'X-Api-Key': '7lg4ZCujpS$PBm!OVwyBNyYs%KvnNt_6YkWI14L8u-No!lL6#ehQsZsaCTmEcvTk',
	},
}

const Login = (req, res) => {
	axios(config)
		.then(function (response) {
			const user = response.data.filter((x) => x.username === req.body.username)
			if (user) {
				const hash = user[0].password
				verify(req, res, hash)
			}
		})
		.catch(function (error) {
			return res.json({ result: error })
		})
}

const verify = async (req, res, hash) => {
	if (await argon2.verify(hash, req.body.password)) {
		// password match
		return res.json({ result: 'ok' })
	} else {
		// password did not match
		return res.json({ result: 'error' })
	}
}

module.exports = Login
