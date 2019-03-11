const router = require('koa-router')();
const { userModel } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('../middleware/sendEmail');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

router.prefix('/mood');

// 注册
router.post('/register', async (ctx, next) => {
  const userMsg = ctx.request.body;
  // 对数据判空处理
  if (userMsg) {
    // 对密码进行加密
    const password = encrytoPwd(userMsg.password);
    userMsg.password = password;
    userMsg.code = uuidv4();
    const email = userMsg.email;
    const nickname = userMsg.nickname;
    const doc = new userModel(userMsg);
    const userMailMsg = { nickname: nickname,email:email, code: userMsg.code }
    try {
      await doc.save();
      nodemailer.sendEmail(userMailMsg);
      ctx.status = 200;
      ctx.body = { message: "success：请在邮箱中点击链接确认" }
    } catch (error) {
      if(error.code = 11000){
        ctx.status = 400;
        ctx.body = { error: "邮箱已存在" }
      }else{
        ctx.status = 500;
        ctx.body = { error }
      }
    }
  } else {
    ctx.status = 400;// 请求错误
    ctx.body = { error:"请检查输入信息" }
  }

})

//确认
router.get('/verification', async (ctx,next) => {
  const code = ctx.querystring;
  try {
    const dataModel = await user.find({status:1,code:code},'createdAt _id')
    const data = dataModel[0];
    const id = data['_id'];
    let  registerUTCtime = data.createdAt
    registerLocalTime = new Date(registerUTCtime).toString();
    const registerUnix = new Date(registerLocalTime).getTime();
    const now = new Date().getTime();
    const time = (now - registerUnix)/(3600*1000)
    if (time > 2) {
      await user.deleteOne({_id:id})
      ctx.status = 408;
      ctx.body = "请求超时，请重新注册";
    } else {
      ctx.set("refresh", `5;URL = http://baidu.com`)
      ctx.status = 201;
      ctx.body = '您已激活成功,5秒后自动跳转……';      
   }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {error:error.message}
  }
})


module.exports = router;

// 对密码加密
function encrytoPwd(pwd) {
  const hmac = crypto.createHmac('sha256', 'a secret');
  hmac.update(pwd);
  return hmac.digest('hex');
}