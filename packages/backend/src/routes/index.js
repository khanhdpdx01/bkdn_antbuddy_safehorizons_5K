import customerRouter from '../api/customers/router';
import productRouter from '../api/products/router';

export const routes = 
[
    ...customerRouter,
    ...productRouter
];
