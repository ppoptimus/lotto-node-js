const argon2 = require('argon2')
const axios = require('axios')

const Register = async (req, res) => {
	const obj = JSON.stringify({
		username: req.body.username,
		password: await argon2.hash(req.body.password),
		tel: req.body.tel,
		bank_name: req.body.bank_name,
		account_number: req.body.account_number,
		account_name: req.body.account_name,
	})
	const config = {
		headers: {
			'X-Api-Key': '7lg4ZCujpS$PBm!OVwyBNyYs%KvnNt_6YkWI14L8u-No!lL6#ehQsZsaCTmEcvTk',
			'Content-Type': 'application/json',
		},
	}
	try {
		const data = await axios.post('https://sheet.best/api/sheets/20fb8e0a-72b1-4246-b7c3-9fb830f0451a', obj, config)
		if(data.status===200){
			return res.status(201).json({status:"ok"})
		}
	} catch (err) {
		return res.status(401).json({
			result: err,
		})
	}
}

module.exports = Register
