const AuthorizationRouter = require('../authorization/routes.config');
const UsersRouter = require('./routes.config');
const Payments = require('../models/Payments')

exports.routesConfig = function (app) {
    AuthorizationRouter.routesConfig(app);
    UsersRouter.routesConfig(app);

    // CURD Models
    app.use('/api/payments', require('../common/utils/crud')(Payments));
}
