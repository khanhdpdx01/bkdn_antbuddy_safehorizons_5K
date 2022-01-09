import BaseController from '../../infrastructure/Controllers/BaseController';
import Authentication from '../../common/guards/authentication';
import CustomersService from '../customers/CustomersService';
import ProductService from '../products/ProductsService'
import Service from './OrdersService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    ORDER_NOT_FOUND,
} from '../../constants/HttpMessage';

class OrderController extends BaseController {
    constructor() {
        super();
        this.orderService = Service.getOrdersService();
        this.authentication = Authentication.getAuthentication();
        this.customerService = CustomersService.getCustomersService();
        this.productService = ProductService.getProductsService();
    }

    static getOrdersController() {
        if (!OrderController.instance) {
            OrderController.instance = new OrderController();
        }
        return OrderController.instance;
    }

    async getAllOrders(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const orders = await this.orderService.getAllOrders({
            sortBy, limit, page,
        });
        return res.status(200).json({ orders });
    }

    async getOrder(req, res, next) {
        const order = await this.orderService.findOneByOrderId(req.params.orderId);
        if (!order) {
            throw new NotFoundError(ORDER_NOT_FOUND);
        }

        return res.status(200).json({ order });
    }


    /*
        Tien trinh mua hang:
            Chon hang them vao gio hang
            ---> Tien hanh dat hang
            ---> Dien thong tin nhu dia chi dat hang, lua chon hinh thuc thanh toan, lua chon don vi van chuyen, hinh thuc van chuyen
            ---> Xac nhan dat hang 
            ---> Don hang chuyen sang trang thai cho dong goi
        Truong hop: khi khach hang chua dang nhap va tien hanh order
            + Chuyen den trang dang nhap 
            + Tao order va order-details
        Truong hop: khach hang da dang nhap va tien hanh order
            + Tao order va order-details
     */
    async createOrder(req, res, next) {
        const accessToken = req.signedCookies.access_token;
        const decoded = await this.authentication.verifyToken(accessToken);
        const customer = await this.customerService.findOneByAccountId(decoded.account_id);
        const newOrder = await this.orderService.addNewOrder(customer.customer_id, req.body);
        res.status(201).json({ newOrder });
        
        newOrder.line_items.forEach(async function(lineItem) {
            let product = await ProductService.getProductsService().findOneByProductId(lineItem.product_id);
            ProductService.getProductsService().updateProduct(
                lineItem.product_id,
                { quantity: product.quantity - lineItem.quantity}
            );
        })
    }
    

    async updateOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            const order = await this.orderService.findOneByCustomerId(orderId);
            if (order) {
                throw new NotFoundError(ORDER_NOT_FOUND);
            }

            const orderUpdate = await this.orderService.updateOrder(
                orderId,
                {
                    customer_id: req.body.customer_id,
                    employee_id: req.body.employee_id,
                    shipper_id: req.body.shipper_id,
                    orders_status_id: req.body.orders_status_id,
                    payment_id: req.body.payment_id,
                    order_date: req.body.order_date,
                    order_address: req.body.order_address,
                    ship_fee: req.body.ship_fee,
                    created_at: req.body.created_at,
                    updated_at: req.body.updated_at,
                },
            );

            return res.status(200).json({ updateOrder });
        } catch (err) {
            next(err);
        }
    }

    async deleteOneOrder(req, res, next) {
        try {
            const result = await this.orderService.deleteOne(req.params.orderId);
            if (result) {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Delete order successfully completed',
                });
            }

            throw new NotFoundError(ORDER_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }
}
export default OrderController;
