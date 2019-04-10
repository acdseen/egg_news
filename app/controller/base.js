'use strict';
const { Controller } = require('egg');
module.exports = class BaseController extends Controller {
  /**
   * 公用分页接口
   *
   * @param {*} { modName = 表名称, fields = 查询字段, populateFields = 关联表 }
   */
  async getPager({ modName = '', fields = [], populateFields = [] }) {
    const { ctx } = this;
    let { pageNum = 1, pageSize = 10, data = {} } = ctx.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 10 : parseInt(pageSize);
    const query = JSON.parse(data);
    if (data && fields.length > 0) {
      query.$or = fields.map(field => ({
        [field]: query[field],
      }));
    }
    const total = await ctx.model[modName].count(query);
    const cursor = ctx.model[modName]
      .find(query)
      .sort({ _id: -1 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
    // 通过关联表填充数据
    populateFields.forEach(field => {
      cursor = populate(field);
    });
    const items = await cursor;
    this.success({
      pageNum,
      pageSize,
      items,
      total,
    });
  }
  success(data) {
    this.ctx.body = {
      code: 0, // 0表示请求成功
      data,
    };
  }
  error(error) {
    this.ctx.body = {
      code: 1, // 1请求失败
      error: error.toString(),
    };
  }
};
