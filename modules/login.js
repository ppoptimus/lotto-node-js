const argon2 = require('argon2')
const axios = require('axios')
const config = require('../connect_service/google-sheet')

const Login = (req, res) => {
	axios(config.sheet_get)
		.then((response) => {
			const user = response.data.filter((x) => x.username === req.body.username)
			if (user.length > 0) {
				const hash = user[0].password
				verify(req, res, hash)
			}else{
				return res.status(404).json({ result: 'user not found' })
			}
		})
		.catch((error) => {
			return res.status(501).json({ result: error.message })
		})
}

const verify = async (req, res, hash) => {
	if (await argon2.verify(hash, req.body.password)) {
		return res.json({ result: 'match' }) // password match
	} else {
		return res.json({ result: 'not match' }) // password did not match
	}
}

module.exports = Login
