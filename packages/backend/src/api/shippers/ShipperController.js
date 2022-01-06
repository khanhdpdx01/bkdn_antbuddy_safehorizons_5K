import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './ShippersService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    CUSTOMER_NOT_FOUND,
} from '../../constants/HttpMessage';

class ShippersController extends BaseController {
    constructor() {
        super();
        this.shippersService = Service.getShippersService();
    }

    static getShippersController() {
        if (!ShippersController.instance) {
            ShippersController.instance = new ShippersController();
        }
        return ShippersController.instance;
    }

    async getAllShippers(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const shippers = await this.shippersService.getAllShippers({
            sortBy, limit, page,
        });
        return res.status(200).json({ shippers });
    }

    async getOneShipper(req, res) {
        const shipper = await this.shippersService
            .findOneByShipperId(req.params.shipperId);
        if (!shipper) {
            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        }

        return res.status(200).json({ shipper });
    }

    async createShipper(req, res) {
        const shipper = await this.shippersService.addNewShipper(req.body);
        return res.status(201).json({ shipper });
    }

    async updateShipper(req, res) {
        const { shipperId } = req.params;
        const shipper = await this.shippersService.findOneByShipperId(shipperId);
        if (!shipper) {
            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        }

        const shipperUpdate = await this.shippersService.updateShipper(
            shipperId,
            { ...req.body },
        );

        return res.status(200).json({ shipperUpdate });
    }

    async deleteOneShipper(req, res) {
        const result = await this.shippersService.deleteOne(req.params.shipperId);
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Delete shipper successfully completed',
            });
        }

        throw new NotFoundError(CUSTOMER_NOT_FOUND);
    }
}
export default ShippersController;
