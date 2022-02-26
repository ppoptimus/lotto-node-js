const jwt = require('jsonwebtoken')
const secret = require('../autorizing/secret')

/**** สร้างฟังก์ชั่น authen next เอาไว้แนบในทุกฟังก์ชั้นอื่นๆ ****/
const GetAuthen = (req, res, next) => {
    /**** ดึง token จาก headers.authorization หรือ Bearer Token ****/
    const token = req.headers.authorization.split(' ')[1]
    
    if(typeof(token)=='undefined' || token === ''){
        return res.status(401).json({message:'Unauthorized'})
    }
    
    /**** verify token ****/
    jwt.verify(token, secret.secret1, (err, decode) => {
        if(err){
            return res.status(401).json({message:err})
        }
        /**** ถ้า verify สำเร็จ ให้เรียกการทำงานขั้นตอนต่อไปได้เลย ****/
        next()
    })
}

module.exports = GetAuthen;