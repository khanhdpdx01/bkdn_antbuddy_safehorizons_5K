import Repository from './CategoriesRepository';
import paginate from '../../utils/paginate';

class CategoriesService {
    constructor() {
        this.categoriesRepository = Repository.getCategoriesRepository();
    }

    static getCategoriesService() {
        if (!CategoriesService.instance) {
            CategoriesService.instance = new CategoriesService();
        }
        return CategoriesService.instance;
    }

    async addNewCategory(category) {
        const newCategory = await this.categoriesRepository.create(category);
        return newCategory;
    }

    async getAllCategories(options) {
        const pagingAndSort = paginate(options);
        const countCategorys = this.categoriesRepository.count();
        const categories = this.categoriesRepository.findAll(pagingAndSort);
        return Promise.all([countCategorys, categories]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                categories: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalCategories: counts[0].count,
            });
        });
    }

    async findOneByCategoryId(categoryId) {
        const Category = await this.categoriesRepository.findByCategoryId(categoryId);
        return Category;
    }

    async updateCategory(categoryId, categoryBody) {
        const categoryUpdate = await this.categoriesRepository.update(
            { category_id: categoryId },
            categoryBody,
        );
        return categoryUpdate;
    }

    async deleteOne(categoryId) {
        const result = await this.categoriesRepository.deleteOne(categoryId);
        return result;
    }
}

export default CategoriesService;
