const router = require('koa-router')();
const { userModel } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');


router.prefix('/mood');
router.post('/login', async (ctx, next) => {

    // 创建用户
 /*
          let user = createUser('test2', 'test2')
        await user.save((err, doc) => {
            console.log(doc);
            if (err) {
                console.log(err)
            }
        });
  */  

    
    // 获取登录信息
    const userMsg = ctx.request.body;
    // 判断是否为空
    if (userMsg) {
        // 对密码进行同样的加密
        const name = userMsg.name;
        const password = encrytoPwd(userMsg.password);
        // 检查用户名密码
        const result = await userModel.findOne({ name: name, password: password });
        if (result) {
            // 生成token
            const token = generateToken();
            try {
                // 将新生成的token存入数据库
                await userModel.updateOne({ name: name },{$set: { token: token }});
                // 登录成功，返回token
                ctx.status = 200;
                ctx.body = {
                    'result': 'success',
                    'token': token
                }
            } catch (error) {
                // 无法返回token，返回错误信息
                ctx.status = 401;
                ctx.body = {
                    'error': {
                        'type': "ERROR",
                        'message': error
                    }
                }
            }

        } else {
            // 信息有误，登录失败
            ctx.status = 400;
            ctx.body = {
                'error': {
                    'type': "LOGIN_FAILED!",
                    'message': '账号或密码错误!'
                }
            }
        }

    }
});


module.exports = router;
// 读取私钥
const priCert = fs.readFileSync('./rsa_private_key.pem');
// 生成token
function generateToken() {
    const created = Math.floor(Date.now() / 1000) + (30 * 60);
    const token = jwt.sign({
        data: 'createToken'
    }, priCert);
    return token;
}

// 对密码加密
function encrytoPwd(pwd) {
    const hmac = crypto.createHmac('sha256', 'a secret');
    hmac.update(pwd);
    return hmac.digest('hex');
}

// 创建用户
function createUser(name, password) {
    // 加密密码
    const encrytoPassword = encrytoPwd(password);
    const user = new userModel({
        name: name,
        password: encrytoPassword,
    });
    return user;
}
