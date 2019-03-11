const jwt = require('jsonwebtoken');
const fs = require('fs')

const priCert = fs.readFileSync('./rsa_private_key.pem');

async function verifyToken(ctx, next) {
    const dataString = ctx.header.authorization;
    try {
        const dataArr = dataString.split(' ');
        const token = dataArr[1];
    
        let playload = await jwt.verify(token, priCert)
        const { data } = playload;
        if (data === 'createToken') {
            ctx.status = 200
            await next()
        }

    } catch (error) {
        ctx.body = {
            "error": {
                "type": "LOGIN_FAILED",
                "message": "未知",
            }

        }
    }
}
        module.exports = { verifyToken }