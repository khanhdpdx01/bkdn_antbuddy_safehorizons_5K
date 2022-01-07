import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class CategoriesRepository extends BaseRepository {
    static getCategoriesRepository() {
        if (!CategoriesRepository.instance) {
            CategoriesRepository.instance = new CategoriesRepository();
        }
        return CategoriesRepository.instance;
    }

    getTableName() {
        return 'categories';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByCategoryId(categoryId) {
        return this.getBy({ id: categoryId });
    }
    
    deleteOne(categoryId) {
        return this.delete({ id: categoryId });
    }
}

export default CategoriesRepository;
