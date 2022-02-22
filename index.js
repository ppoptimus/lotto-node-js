const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');

const Register = require('./modules/register')
const Login = require('./modules/login')
const app = express()
app.use(cors())
app.use(express.json())

const mockup = require('./mockdata')

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
