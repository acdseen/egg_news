const BaseController = require('./base');
// 定义接口的请求参数规则
const createRule = {
    articleTitle: { type: "string", required: true },
    editorContent: { type: "string", required: true },
    newsType: { type: "number", required: true },
    newsLabel: { type: "string", required: true },
    publishTime: { type: "string", required: true }
};
class NewsController extends BaseController {
    //查询新闻
    async index() {
        try {
            await this.getPager({ modName: 'News', fields: ['newsLabel'] })
        } catch (error) {
            this.error(error);
        }
    }
    async create() {
        let { ctx } = this;
        // 如果检验未通过，则会抛出status=422的异常
        ctx.validate(createRule);
        let news = ctx.request.body;
        try {
            news = await ctx.service.news.create(news);
            this.success('新闻创建成功')
        } catch (error) {
            this.error(error);
        }
    }
    async update() {
        const { ctx } = this;
        let id = ctx.params.id;
        let news = ctx.request.body;
        try {
            await ctx.model.News.findByIdAndUpdate(id, news);
            this.success('更新新闻成功');
        } catch (error) {
            this.error(error);
        }
    }
    async destroy() {
        const { ctx } = this;
        let id = ctx.params.id;
        let { ids = [] } = ctx.request.body;
        ids.push(id);
        try {
            await ctx.model.News.remove({ _id: { $in: ids } });
            this.success('删除文章成功');
        } catch (error) {
            this.error(error);
        }
    }
}
module.exports = NewsController;