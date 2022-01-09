import Repository from './EmployeesRepository';
import paginate from '../../utils/paginate';

class EmployeesService {
    constructor() {
        this.employeesRepository = Repository.getEmployeesRepository();
    }

    static getEmployeesService() {
        if (!EmployeesService.instance) {
            EmployeesService.instance = new EmployeesService();
        }
        return EmployeesService.instance;
    }

    async addNewEmployee(employee) {
        const newEmployee = await this.employeesRepository.create(employee);
        return newEmployee;
    }

    async getAllEmployees(options) {
        const pagingAndSort = paginate(options);
        const countEmployees = this.employeesRepository.count();
        const employees = this.employeesRepository.findAll(pagingAndSort);
        return Promise.all([countEmployees, employees]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                emplyees: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalEmployees: counts[0].count,
            });
        });
    }

    async findOneByEmployeeId(employeeId) {
        const employee = await this.employeesRepository.findByEmployeeId(employeeId);
        return employee;
    }

    async updateEmployee(employeeId, employeeBody) {
        const employeeUpdate = await this.employeesRepository.update(
            { employee_id: employeeId },
            { ...employeeBody },
        );
        return employeeUpdate;
    }

    async deleteOne(employeeId) {
        const result = await this.employeesRepository.deleteOne(employeeId);
        return result;
    }
}

export default EmployeesService;
