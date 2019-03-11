const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'QQ', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: '1657664067@qq.com',
        // 这里密码不是qq密码，是设置的smtp授权码
        pass: 'kqwfsitahisqdehj',
    }
});

function sendEmail(data) {
    let mailOptions = {
        from: '"Leilalatree" <1657664067@qq.com>', // sender address
        to: data.email, // list of receivers
        subject: `Hello Dear ${data.nickname}`, // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: `<b>感谢你的注册，世界爱着你❤️ </br>请在两小时内点击: <a href="http://127.0.0.1:5656/mood/verification?${data.code}">确认</a></b>`// html body
    };  //  172.16.19.213公司
    // send mail with defined transport object

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        }
        resolve('Message sent: %s', info.messageId)
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });


}




module.exports = { sendEmail };