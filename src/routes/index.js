const AuthorizationRouter = require('../authorization/routes.config')
const UsersRouter = require('./routes.config')
const Payments = require('../models/Payments')
const Receipts = require('../models/Receipts')
const Banks = require('../models/Banks')

exports.routesConfig = function (app) {
    AuthorizationRouter.routesConfig(app);
    UsersRouter.routesConfig(app);

    // CURD Models
    app.use('/payments', require('../common/utils/crud')(Payments));
    app.use('/receipts', require('../common/utils/crud')(Receipts));
    app.use('/banks', require('../common/utils/crud')(Banks));
}
