const config = require('../common/config/env.config.js');

module.exports = app => {
  app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
  });
}