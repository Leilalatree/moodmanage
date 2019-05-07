var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nickname: { type: String },
    avatarUrl: { type: String },
    email: { type: String, unique:true },
    code:String,
    password:String,
    token: String,
    status: { type: Number, default: 1 }, // 1:真实用户，0：注册失败
}, {
        timestamps: true,
    });
userSchema.method('toClient', function () {
    var obj = this.toObject();
    obj.id = obj._id.toString();
    delete obj._id;

    return obj;
});


module.exports.userModel = mongoose.model('user', userSchema);
