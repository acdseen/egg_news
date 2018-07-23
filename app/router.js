'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/user/signup',controller.user.signup);
  router.post('/api/user/signin',controller.user.signin);
  router.get('/api/user/signout',controller.user.signout);
  // 图片上传
  router.post('/api/uploadimg',controller.upload.uploadimg);
};
