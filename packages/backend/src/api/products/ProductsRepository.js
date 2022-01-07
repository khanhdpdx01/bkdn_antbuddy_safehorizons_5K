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

    findByProductsId(productId) {
        return this.getBy({ id: productId });
    }

    deleteOne(productId) {
        return this.delete({ product_id: productId });
    }
}

export default ProductsRepository;
