const router = require('koa-router')();
const { talkModel } = require('../models/talk');

// router.use(verifyToken)
router.prefix('/mood');

router.all('/talk/list', async (ctx, next) => {
  try {
    // 查找数据
    let result = await talkModel.find({});
    console.log(result);
    ctx.body = result;

  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

router.all('/talk/add', async (ctx, next) => {
  try {
    const { id, text, nickname, avatar } = ctx.params;

    const talk = new talkModel({
      auther: id, text, nickname, avatar
    });
    await talk.save();
    ctx.body = {
      code: 200,
      msg: '发送成功'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: error.message
    }
  }
})

router.all('/talk/del', async (ctx, next) => {
  try {
    const { id } = ctx.params;
    await talkModel.findOneAndDelete({ _id: id });
    ctx.body = {
      code: 200,
      msg: '删除成功'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: error.message
    }
  }
})

module.exports = router;