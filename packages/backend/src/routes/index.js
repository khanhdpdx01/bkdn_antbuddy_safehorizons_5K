import customerRouter from '../api/customers/router';
import productRouter from '../api/products/router';
import rolesRouter from '../api/roles/router';
import authRouter from '../api/auth/router';
import supplierRouter from '../api/suppliers/router';
import shippersRouter from '../api/shippers/router';
import employeesRouter from '../api/employees/router';
import categoriesRouter from '../api/categories/router';
import cartRouter from '../api/cart/router';
import orderRouter from '../api/orders/router';
import statictisRouter from '../api/statictis/router';
// import paymentRouter from '../api/payments/router';

export const routes = 
[
    ...customerRouter,
    ...productRouter,
    ...rolesRouter,
    ...authRouter,
    ...supplierRouter,
    ...shippersRouter,
    ...employeesRouter,
    ...categoriesRouter,
    ...cartRouter,
    ...orderRouter,
    ...statictisRouter
    // ...paymentRouter,
];
