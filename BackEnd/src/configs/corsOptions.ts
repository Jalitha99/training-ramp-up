const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    orign: (origin: any, callback : any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200,
}

module.exports = corsOptions;