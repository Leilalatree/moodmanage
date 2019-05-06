var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commitSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'user' },
  commit: String,
  Reply: { type: Schema.Types.ObjectId, ref: 'user' },
  detailUrl: String,
  status: { type: Number, default: 1 }, // 0:删除
}, {
    timestamps: true,
  });


module.exports.commitModel = mongoose.model('commit', commitSchema);