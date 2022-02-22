const argon2 = require('argon2')
const axios = require('axios')
const { sheet_post } = require('../connect_service/google-sheet')

const Register = async (req, res) => {
	let date = new Date().toLocaleDateString()
	let time = new Date().toLocaleTimeString()
	const obj = JSON.stringify({
		username: req.body.username,
		password: await argon2.hash(req.body.password),
		tel: req.body.tel,
		bank_name: req.body.bank_name,
		account_number: req.body.account_number,
		account_name: req.body.account_name,
		create_datetime : `${date} ${time}`
	})
	try {
		const data = await axios.post(sheet_post.url, obj, sheet_post.config)
		if (data.status === 200) {
			return res.status(201).json({ status: 'created' })
		}
	} catch (err) {
		return res.status(401).json({
			result: err,
		})
	}
}

module.exports = Register
