var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var talkSchema = new Schema({
  auther: { type: Schema.Types.ObjectId, ref: 'user' },
  text: { type: String },
  nickname: { type: String },
  avatar: { type: String },
  status: { type: Number, default: 1 }, // 0:删除
  like: { type: Array, default: [] },
  commit: { type: Array, default: [] }, // [ {replay_id: uuid, user_id: ba65..., text: '回复', commit: [ {replay: uuid, user_id: c656..., text: '回复ba65', commit: [] } ]}, {...} ]
}, {
    timestamps: true,
  });


module.exports.talkModel = mongoose.model('talk', talkSchema);