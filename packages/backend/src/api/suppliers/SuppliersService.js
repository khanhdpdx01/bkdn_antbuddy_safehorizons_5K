import Repository from './SuppliersRepository';
import paginate from '../../utils/paginate';

class SuppliersService {
    constructor() {
        this.suppliersRepository = Repository.getSuppliersRepository();
    }

    static getSuppliersService() {
        if (!SuppliersService.instance) {
            SuppliersService.instance = new SuppliersService();
        }
        return SuppliersService.instance;
    }

    async addNewSupplier(supplier) {
        const newSupplier = await this.suppliersRepository.create(supplier);
        return newSupplier;
    }

    async getAllSuppliers(options) {
        const pagingAndSort = paginate(options);
        const countSuppliers = this.suppliersRepository.count();
        const supplier = this.suppliersRepository.findAll(pagingAndSort);
        return Promise.all([countSuppliers, supplier]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                suppliers: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalSuppliers: counts[0].count,
            });
        });
    }

    async findOneBySupplierId(supplierId) {
        const supplier = await this.suppliersRepository.findBySupplierId(supplierId);
        return supplier;
    }

    async updateSupplier(supplierId, supplierBody) {
        const supplierUpdate = await this.suppliersRepository.update(
            { supplier_id: supplierId },
            { ...supplierBody },
        );
        return supplierUpdate;
    }

    async deleteOne(supplierId) {
        const result = await this.suppliersRepository.deleteOne(supplierId);
        return result;
    }
}

export default SuppliersService;
