import Repository from './CustomersRepository';
import paginate from '../../utils/paginate';

class CustomersService {
    constructor() {
        this.customerRepository = Repository.getCustomersRepository();
    }

    static getCustomersService() {
        if (!CustomersService.instance) {
            CustomersService.instance = new CustomersService();
        }
        return CustomersService.instance;
    }

    async addNewCustomer(customer) {
        const newCustomer = await this.customerRepository.create(customer);
        return newCustomer;
    }

    async getAllCustomers(options) {
        const pagingAndSort = paginate(options);
        const countCustomers = this.customerRepository.count();
        const customers = this.customerRepository.findAll(pagingAndSort);
        return Promise.all([countCustomers, customers]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                customers: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalCustomers: counts[0].count,
            });
        });
    }

    async findOneByCustomerId(customerId) {
        const customer = await this.customerRepository.findByCustomerId(customerId);
        return customer;
    }

    async findOneByAccountId(accountId) {
        const customer = await this.customerRepository.getBy({account_id: accountId});
        return customer;
    }

    async findOneByMobilePhone(mobilePhone) {
        const customer = await this.customerRepository.findByMobilePhone(mobilePhone);
        return customer;
    }

    async updateCustomer(customerId, customerBody) {
        const customerUpdate = await this.customerRepository.update(
            { customer_id: customerId },
            { ...customerBody },
        );
        return customerUpdate;
    }

    async deleteOne(customerId) {
        const result = await this.customerRepository.deleteOne(customerId);
        return result;
    }
}

export default CustomersService;
