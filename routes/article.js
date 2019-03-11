const router = require('koa-router')();
const { articleModel } = require('../models/articleModel');

const { verifyToken } = require('../middleware/verify')

router.use(verifyToken)
router.prefix('/mood');
router.get('/articles', async (ctx, next) => {
  try {
    const data = await articleModel.find({ status: 1 })
      .sort({ '_id': -1 });
      ctx.status = 200;
      ctx.body = data;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {error:error.message};
  }
})