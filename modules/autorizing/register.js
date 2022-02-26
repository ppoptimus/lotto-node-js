const argon2 = require('argon2')
const config = require('../../connect_service/google-sheet')
const admin = require('firebase-admin')

const Register = async (req, res) => {
	let date = new Date().toLocaleDateString()
	let time = new Date().toLocaleTimeString()
	const obj = JSON.stringify({
		username: req.body.username,
		/**** encript pass with argon2 ****/
		password: await argon2.hash(req.body.password), 
		tel: req.body.tel,
		bank_name: req.body.bank_name,
		account_number: req.body.account_number,
		account_name: req.body.account_name,
		create_datetime: `${date} ${time}`,
	})
	try {
		/**** call function post register from another jsfile ****/
		/**** "data" is response from post method ****/
		const data = await config.post_to_sheet(obj)
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
