import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class CustomersRepository extends BaseRepository {
    static getCustomersRepository() {
        if (!CustomersRepository.instance) {
            CustomersRepository.instance = new CustomersRepository();
        }
        return CustomersRepository.instance;
    }

    getTableName() {
        return 'customers';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByCustomerId(customerId) {
        return this.getBy({ customer_id: customerId });
    }

    findByMobilePhone(phone) {
        return this.getBy({ mobile_phone: phone });
    }

    findByFirstNameAndLastName(firstName, lastName) {
        return this.listBy({
            first_name: firstName,
            last_name: lastName,
        });
    }

    deleteOne(customerId) {
        return this.delete({ customer_id: customerId });
    }
}

export default CustomersRepository;
