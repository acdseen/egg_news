const { Service } = require('egg');
class NewsService extends Service {
    async create(news) {
        return await this.ctx.model.News.create(news);
    }
}
module.exports = NewsService;