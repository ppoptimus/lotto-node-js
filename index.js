const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const Register = require('./modules/autorizing/register')
const Login = require('./modules/autorizing/login')
const GetUser = require('./modules/controller/test-get-user')
const GetAuthen = require('./modules/autorizing/authen')


//#region ==running port==//
app.listen(9000, () => {
	console.log('Application is running on port 9000')
})
//#endregion

app.get('/api', (req, res) => {
	res.json({ result: 'connected' })
})

app.post('/api/register', (req, res) => {
	Register(req, res)
})

app.post('/api/login', (req, res) => {
	Login(req, res)
})

app.get('/api/user', GetAuthen, (req, res) => {
	GetUser(req, res)
})
