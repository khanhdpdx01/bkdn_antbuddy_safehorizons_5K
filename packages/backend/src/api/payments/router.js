import PaymentsController from './PaymentsController';
import { routerGroup } from '../../common/helpers/routerGroup';

const paymentsController = new PaymentsController();

export default routerGroup({
        name: 'payments',
        prefix: '/payments',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [paymentsController.callMethod('getAllPayments')],
    }, {
        method: 'GET',
        path: '/:paymentId',
        handlers: [paymentsController.callMethod('getPayment')],
    }, {
        method: 'POST',
        path: '/',
        handlers: [paymentsController.callMethod('createPayment')],
    }, {
        method: 'PUT',
        path: '/:paymentId',
        handlers: [paymentsController.callMethod('updatePayment')],
    }, {
        method: 'DELETE',
        path: '/:paymentId',
        handlers: [paymentsController.callMethod('deleteOnePayment')],
    },
]);
