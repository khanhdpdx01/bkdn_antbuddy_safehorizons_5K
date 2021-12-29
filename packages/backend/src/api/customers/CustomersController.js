import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './CustomersService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    CUSTOMER_NOT_FOUND,
} from '../../constants/HttpMessage';

class CustomersController extends BaseController {
    constructor() {
        super();
        this.customerService = Service.getCustomersService();
    }

    static getCustomersController() {
        if (!CustomersController.instance) {
            CustomersController.instance = new CustomersController();
        }
        return CustomersController.instance;
    }

    async getAllCustomers(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const customers = await this.customerService.getAllCustomers({
            sortBy, limit, page,
        });
        return res.status(200).json({ customers });
    }

    async getCustomer(req, res, next) {
        try {
            const customer = await this.customerService.getBy({ id: req.params.customerId });
            if (!customer) {
                throw new NotFoundError(CUSTOMER_NOT_FOUND);
            }

            return res.status(200).json({ customer });
        } catch (err) {
            return next(err);
        }
    }

    async createCustomer(req, res, next) {
        try {
            const customer = await this.customerService.addNewCustomer(req.body);
            return res.status(201).json({ customer });
        } catch (err) {
            next(err);
        }
    }

    async updateCustomer(req, res, next) {
        try {
            const { customerId } = req.params.customerId;
            const customer = await this.customerService.findOneByCustomerId(customerId);
            if (customer) {
                throw new NotFoundError(CUSTOMER_NOT_FOUND);
            }

            const customerUpdate = await this.customerService.updateCustomer(
                customerId,
                {
                    company: req.body.company,
                    last_name: req.body.last_name,
                    first_name: req.body.first_name,
                    email_address: req.body.email_address,
                    job_title: req.body.job_title,
                    business_phone: req.body.business_phone,
                    home_phone: req.body.home_phone,
                    mobile_phone: req.body.mobile_phone,
                    fax_number: req.body.fax_number,
                    address: req.body.address,
                    city: req.body.city,
                    state_province: req.body.state_province,
                    zip_postal_code: req.body.zip_postal_code,
                    country_region: req.body.country_region,
                    web_page: req.body.web_page,
                    notes: req.body.notes,
                    attachments: req.body.attachments,
                },
            );

            return res.status(200).json({ customerUpdate });
        } catch (err) {
            next(err);
        }
    }

    async deleteOneCustomer(req, res, next) {
        try {
            const result = await this.customerService.deleteOne(req.params.customerId);
            if (result) {
                return res.status(200).json({
                    statusCOde: 200,
                    message: 'Delete customer successfully completed',
                });
            }

            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }
}
export default CustomersController;
