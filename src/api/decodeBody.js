import jwt from 'jsonwebtoken'

export default function handler(req, res) {

    const { data } = req.body
    const secret = process.env.TOKEN_SECRET_KEY

    const decoded = jwt.verify( data, secret ) // 1 week

    res.status(200).json(decoded)

}  
