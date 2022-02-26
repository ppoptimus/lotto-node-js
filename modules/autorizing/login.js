const argon2 = require('argon2')
const axios = require('axios')
const config = require('../../connect_service/google-sheet')
const jwt = require('jsonwebtoken')
const secret = require('../autorizing/secret')

const Login = (req, res) => {
	axios(config.sheet_get)
		.then((response) => {
			/**** get user from database where username = body.username ****/
			const user = response.data.filter((x) => x.username === req.body.username)
			if (user.length > 0) {
				const pass_hashed = user[0].password
				verify(req, res, pass_hashed)
			} else {
				return res.status(404).json({ result: 'user not found' })
			}
		})
		.catch((error) => {
			return res.status(501).json({ result: error.message })
		})
}

const verify = async (req, res, pass_hashed) => {
	const user = req.body.username
	/**** verify with argon2 (password hash - password text) ****/
	if (await argon2.verify(pass_hashed, req.body.password)) {
		/**** if match generate token with secret as defind ****/
		const token = jwt.sign({ user }, secret.secret1, { expiresIn: '1h' })
		return res.json({ result: 'match', token })
	} else {
		return res.json({ result: 'not match' })
	}
}

module.exports = Login
