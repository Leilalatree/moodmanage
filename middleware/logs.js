module.exports = function () {
    return async function (ctx, next) {
        if (ctx.method === 'POST') {
            ctx.params = ctx.request.body;
        } else {
            ctx.params = ctx.query;
        }

        const start = new Date();

        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} Request:${JSON.stringify(ctx.params)} Response:${JSON.stringify(ctx.body)} - ${ms}ms`);

    }
}
