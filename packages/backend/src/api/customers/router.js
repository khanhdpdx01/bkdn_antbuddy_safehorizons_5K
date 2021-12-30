import CustomersController from './CustomersController';
import { routerGroup } from '../../common/helpers/routerGroup';
import ValidationHelper from '../../common/filters/validation';

const customersController = new CustomersController();

export default routerGroup({
        name: 'customers',
        prefix: '/customers',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [customersController.callMethod('getAllCustomers')],
    }, {
        method: 'GET',
        path: '/:customerId',
        handlers: [customersController.callMethod('getCustomer')],
    }, {
        method: 'POST',
        path: '/',
        handlers: [customersController.callMethod('createCustomer')],
    }, {
        method: 'PUT',
        path: '/:customerId',
        handlers: [customersController.callMethod('updateCustomer')],
    }, {
        method: 'DELETE',
        path: '/:customerId',
        handlers: [customersController.callMethod('deleteOneCustomer')],
    },
]);
// ValidationHelper.isEmail('email_address', true), 
/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API Customers
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */
