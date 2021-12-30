import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class ProductsRepository extends BaseRepository {
    static getProductsRepository() {
        if (!ProductsRepository.instance) {
            ProductsRepository.instance = new ProductsRepository();
        }
        return ProductsRepository.instance;
    }

    getTableName() {
        return 'products';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByProductsId(customerId) {
        return this.getBy({ id: customerId });
    }

    deleteOne(productId) {
        return this.delete({ id: productId });
    }
}

export default ProductsRepository;
