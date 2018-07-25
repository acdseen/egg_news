const {Controller}=require('egg');
module.exports=class BaseController extends Controller{
    async getPager({ modName = '', fields = [], populateFields = [] }) {
        const { ctx } = this;
        let { pageNum = 1, pageSize = 5, keyword = '' } = ctx.query;
        pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
        pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);
        let query = {};
        console.log(keyword);
        if (keyword && fields.length > 0) {
            query['$or'] = fields.map(field => ({ [field]: new RegExp(keyword) }));
        }
        let total = await ctx.model[modName].count(query);
        console.log(query);
        let cursor = ctx.model[modName].find(query).sort({ _id: -1 }).skip((pageNum - 1) * pageSize).limit(pageSize);
        populateFields.forEach(field => {
            cursor = cursor.populate(field);
        });
        let items = await cursor;
        this.success({
            pageNum,
            pageSize,
            items,
            total
        });
    }
    success(data){
        this.ctx.body={
            code:0,
            data
        }
    }
    error(error){
        
        this.ctx.body={
            code:1,
            error:error.toString()
        }
    }
}