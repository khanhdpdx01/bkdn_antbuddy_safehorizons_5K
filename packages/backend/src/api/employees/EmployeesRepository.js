import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class EmployeesRepository extends BaseRepository {
    static getEmployeesRepository() {
        if (!EmployeesRepository.instance) {
            EmployeesRepository.instance = new EmployeesRepository();
        }
        return EmployeesRepository.instance;
    }

    getTableName() {
        return 'employees';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByEmployeeId(employeeId) {
        return this.getBy({ employee_id: employeeId });
    }

    deleteOne(employeeId) {
        return this.delete({ employee_id: employeeId });
    }
}

export default EmployeesRepository;
