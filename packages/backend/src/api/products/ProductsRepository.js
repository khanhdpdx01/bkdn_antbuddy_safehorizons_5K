import BaseRepository from '../../infrastructure/Repositories/BaseRepository';
import knex from '../../config/connection';

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

    findAll(pagingAndSort, categoryId) {
        if (categoryId) {
            return knex(this.getTableName()).select(['*']).where({ category_id: categoryId })
                .orderBy(pagingAndSort.sort)
                .limit(pagingAndSort.limit)
                .offset(pagingAndSort.offset);
        }
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
