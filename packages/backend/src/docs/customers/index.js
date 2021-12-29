import createCustomer from './createCustomer';
import getAllCustomers from './getAllCustomers';

export default {
    paths: {
        '/api/v1/customers': {
            ...createCustomer,
            ...getAllCustomers,
        },
        // '/api/v1/customers/{customerId}': {
        // }
    },
};
