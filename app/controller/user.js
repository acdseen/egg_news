'use strict';
const BaseController = require('./base');
class UserController extends BaseController {
  async signup() {
    const { ctx } = this;
    let user = ctx.request.body;
    try {
      user = await ctx.model.User.create(user);
      // 保存用户信息
      await ctx.model.UserInfo.create({
        staff: user._id,
      });
      this.success({ user });
    } catch (error) {
      this.error(error);
    }
  }
  async signin() {
    const { ctx } = this;
    const user = ctx.request.body;
    const jwt = this.app.jwt;
    const moment = this.app.moment;
    try {
      const doc = await ctx.model.User.findOne(user);
      const expires = moment()
        .add(7, 'days')
        .valueOf();
      if (doc) {
        // ctx.session.user = doc;
        const token = jwt.sign(
          {
            user: doc,
            exp: expires,
          },
          this.app.config.jwt.secret
        );
        this.success(token);
      } else {
        this.error('用户名或密码错误！');
      }
    } catch (error) {
      this.error(error);
    }
  }
  async getUserInfo() {
    const { ctx } = this;
    const authorization = ctx.request.headers.authorization;
    try {
      const decoded = this.app.jwt.decode(
        authorization.split(' ')[1],
        this.app.jwt.secret
      );
      const staff = decoded.user._id;
      // 通过外键填充用户信息
      const store = ctx.model.UserInfo.findOne({ staff }).populate('staff');
      const item = await store;
      this.success(item);
    } catch (error) {
      this.error(error);
    }
  }
  signout() {
    // jwt是无状态的，退出登录只需客户端删除token
    this.success('已退出！');
  }
}
module.exports = UserController;
