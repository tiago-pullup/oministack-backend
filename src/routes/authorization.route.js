const VerifyUserMiddleware = require('../common/middlewares/verify.user.middleware');
const AuthorizationController = require('../controllers/authorization.controller');
const AuthValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

module.exports = app => {

    app.post('/auth', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]);
};