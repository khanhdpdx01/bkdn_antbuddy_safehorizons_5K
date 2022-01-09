import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class PaymentsRepository extends BaseRepository {
    static getPaymentsRepository() {
        if (!PaymentsRepository.instance) {
            PaymentsRepository.instance = new PaymentsRepository();
        }
        return PaymentsRepository.instance;
    }

    getTableName() {
        return 'payments';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByPaymentId(paymentId) {
        return this.getBy({ id: paymentId });
    }
    
    deleteOne(paymentId) {
        return this.delete({ id: paymentId });
    }
}

export default PaymentsRepository;
