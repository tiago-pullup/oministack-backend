// const AuthorizationRouter = require('./authorization.route')
const Payments = require('../models/Payments')
const Receipts = require('../models/Receipts')
const Banks = require('../models/Banks')

module.exports = app => {
    // AuthorizationRouter.routesConfig(app);

    // CURD Models
    app.use('/payments', require('../common/utils/crud')(Payments));
    app.use('/receipts', require('../common/utils/crud')(Receipts));
    app.use('/banks', require('../common/utils/crud')(Banks));

}
