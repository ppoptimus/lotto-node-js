const user = [
	{
		id: '001',
		name: 'rathapong',
	},
	{
		id: '002',
		name: 'pumpo',
	},
]

const GetUser = (req, res) => {
    return res.json(user)
}

module.exports = GetUser;
