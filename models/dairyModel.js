var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dairySchema = new Schema({
    user_id: Objectid,
    content: String,
    imgUrl:String, 
    detailUrl:String,
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


module.exports.dairyModel = mongoose.model('dairy', dairySchema);