var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: { type: String },
    writer: { type: String },
    briefIntroduction: String,
    introductionImgUrl:String, 
    imgUrl: String,
    detailUrl:String,
    commit: { type: Array, default: [] }, // 界面
    status: { type: Number, default: 1 }, // 0:删除
}, {
        timestamps: true,
    });
userSchema.method('toClient', function () {
    var obj = this.toObject();
    obj.id = obj._id.toString();
    delete obj._id;

    return obj;
});


module.exports.articleModel = mongoose.model('article', articleSchema);