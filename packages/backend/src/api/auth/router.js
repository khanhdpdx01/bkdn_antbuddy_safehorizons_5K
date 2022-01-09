import AuthController from './AuthController';
import catchAsync from '../../utils/catchAsync';
import { routerGroup } from '../../common/helpers/routerGroup';
import ValidationHelper from '../../common/filters/validation';

const authController = new AuthController();

export default routerGroup({
        name: 'auth',
        prefix: '/auth',
    }, [
    {
        method: 'POST',
        path: '/register',
        handlers: [catchAsync(authController.callMethod('register'))],
    }, {
        method: 'POST',
        path: '/login',
        handlers: [catchAsync(authController.callMethod('login'))],
    }, {
        method: 'PATCH',
        path: '/:accountId',
        handlers: [catchAsync(authController.callMethod('updateAccount'))],
    }, {
        method: 'DELETE',
        path: '/:accountId',
        handlers: [catchAsync(authController.callMethod('deleteOneAccount'))],
    }, {
        method: 'POST',
        path: '/refresh-tokens',
        handlers: [catchAsync(authController.callMethod('refreshToken'))],
    }, {
        method: 'POST',
        path: '/forgot-password',
        handlers: [catchAsync(authController.callMethod('forgotPassword'))],
    }, {
        method: 'POST',
        path: '/reset-password',
        handlers: [catchAsync(authController.callMethod('resetPassword'))],
    }, {
        method: 'POST',
        path: '/send-verfication-email',
        handlers: [catchAsync(authController.callMethod('sendVerifyEmail'))],
    }, {
        method: 'POST',
        path: '/verification-email',
        handlers: [catchAsync(authController.callMethod('verifyEmail'))],
    },
]);
