import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './SuppliersService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    CUSTOMER_NOT_FOUND,
} from '../../constants/HttpMessage';

class SuppliersController extends BaseController {
    constructor() {
        super();
        this.suppliersService = Service.getSuppliersService();
    }

    static getSuppliersController() {
        if (!SuppliersController.instance) {
            SuppliersController.instance = new SuppliersController();
        }
        return SuppliersController.instance;
    }

    async getAllSuppliers(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const suppliers = await this.suppliersService.getAllSuppliers({
            sortBy, limit, page,
        });
        return res.status(200).json({ suppliers });
    }

    async getOneSupplier(req, res) {
        const supplier = await this.suppliersService
            .findOneBySupplierId(req.params.supplierId);
        if (!supplier) {
            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        }

        return res.status(200).json({ supplier });
    }

    async createSupplier(req, res) {
        const supplier = await this.suppliersService.addNewSupplier(req.body);
        return res.status(201).json({ supplier });
    }

    async updateSupplier(req, res) {
        const { supplierId } = req.params;
        const supplier = await this.suppliersService.findOneBySupplierId(supplierId);
        if (!supplier) {
            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        }

        const supplierUpdate = await this.suppliersService.updateSupplier(
            supplierId,
            { ...req.body },
        );

        return res.status(200).json({ supplierUpdate });
    }

    async deleteOneSupplier(req, res) {
        const result = await this.suppliersService.deleteOne(req.params.supplierId);
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Delete supplier successfully completed',
            });
        }

        throw new NotFoundError(CUSTOMER_NOT_FOUND);
    }
}
export default SuppliersController;
