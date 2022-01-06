import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './EmployeesService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    CUSTOMER_NOT_FOUND,
} from '../../constants/HttpMessage';

class EmployeesController extends BaseController {
    constructor() {
        super();
        this.employeesService = Service.getEmployeesService();
    }

    static getEmployeesController() {
        if (!EmployeesController.instance) {
            EmployeesController.instance = new EmployeesController();
        }
        return EmployeesController.instance;
    }

    async getAllEmployees(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const employees = await this.employeesService.getAllEmployees({
            sortBy, limit, page,
        });
        return res.status(200).json({ employees });
    }

    async getOneEmployee(req, res) {
        const employee = await this.employeesService
            .findOneByEmployeeId(req.params.employeeId);
        if (!employee) {
            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        }

        return res.status(200).json({ employee });
    }

    async createEmployee(req, res) {
        const employee = await this.employeesService.addNewEmployee(req.body);
        return res.status(201).json({ employee });
    }

    async updateEmployee(req, res) {
        const { employeeId } = req.params;
        const employee = await this.employeesService.findOneByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        }

        const employeeUpdate = await this.employeesService.updateEmployee(
            employeeId,
            { ...req.body },
        );

        return res.status(200).json({ employeeUpdate });
    }

    async deleteOneEmployee(req, res) {
        const result = await this.employeesService.deleteOne(req.params.employeeId);
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Delete employee successfully completed',
            });
        }

        throw new NotFoundError(CUSTOMER_NOT_FOUND);
    }
}
export default EmployeesController;
