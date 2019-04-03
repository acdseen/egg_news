'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531979686037_9079';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/201812blog',
    },
  };
  config.security = {
    csrf: false,
    domainWhiteList: [ 'http://localhost:8080' ],
  };
  return config;
};
