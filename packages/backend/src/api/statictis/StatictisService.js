import Repository from './StatictisRepository';
import OrdersRepository from '../orders/OrdersRepository';
import CustomerRepository from '../customers/CustomersRepository';
import ProductsRepository from '../products/ProductsRepository';
import OrdersService from '../orders/OrdersService';
import paginate from '../../utils/paginate';

class StatictisService {
    constructor() {
        this.statictisRepository = Repository.getStatictisRepository();
        this.ordersRepository = OrdersRepository.getOrdersRepository();
        this.customerRepository = CustomerRepository.getCustomersRepository();
        this.productRepository = ProductsRepository.getProductsRepository();
        this.orderService = OrdersService.getOrdersService();
    }

    static getStatictisService() {
        if (!StatictisService.instance) {
            StatictisService.instance = new StatictisService();
        }
        return StatictisService.instance;
    }

    async statictis() {
        const [totalOrders, totalCustomer, totalProducts] = await Promise.all([
            this.getTotalOrders(),
            this.getTotalCustomer(),
            this.getTotalProducts(),
        ]);
        const totalIncome = await this.getTotalIncome(totalOrders.count);
        const statictis = {
            total_orders: totalOrders.count,
            total_customers: totalCustomer.count,
            total_products: totalProducts.count,
            total_income: totalIncome
        }
        return statictis;
    }

    async getTotalOrders() {        
        const totalOrders = await this.ordersRepository.count().first();
        return totalOrders;
    }

    async getTotalCustomer() {
        const totalCustomers = await this.customerRepository.count().first();
        return totalCustomers;
    }

    async getTotalProducts() {
        const totalProducts = await this.productRepository.count().first();
        return totalProducts;
    }

    async getTotalIncome(totalOrders) {
        const orders = await this.orderService.getAllOrders({
            limit: totalOrders
        })
        
        let totalIncome = 0;
        orders.orders.forEach(function(order) {
            totalIncome += order.total_price;
        });
        return totalIncome;
    }
}

export default StatictisService;
