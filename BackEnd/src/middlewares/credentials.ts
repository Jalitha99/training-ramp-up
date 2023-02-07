const allowed = require('../configs/allowedOrigins')

const credentials = (req: any, res: any, next: any) => {
    const origin = req.headers.origin
    if (allowed.inclueds(origin)){
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials