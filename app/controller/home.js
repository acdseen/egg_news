'use strict';
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await new Promise((resolve, reject) => {
      const filepath = path.join(this.config.baseDir, 'app/public/index.html');
      fs.readFile(filepath, 'utf-8', (error, html) => {
        if (error) reject(error);
        resolve(html);
      });
    }).then(res => {
      this.ctx.body = res;
    });
  }
}

module.exports = HomeController;
