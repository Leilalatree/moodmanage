var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    question: { type: String },
    category: { type: String },// 类别
    value: Number,// 分值
    choices:Array,//选择
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


module.exports.testModel = mongoose.model('test', testSchema);