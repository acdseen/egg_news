'use strict';
const BaseController = require('./base');
class UserController extends BaseController {
  async signup() {
    const { ctx } = this;
    let user = ctx.request.body;
    try {
      user = await ctx.model.User.create(user);
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

  async signout() {
    const { ctx } = this;
    // ctx.session.user = null;
    this.success('已退出！');
  }
}
module.exports = UserController;
