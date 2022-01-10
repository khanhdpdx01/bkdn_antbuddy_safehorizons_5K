import Service from './Service';

class CategoryService {
    constructor(callback) {
        this.callback = callback;
    }

    async getCategories(params) {
        try {
            const categories = await Service.get('/categories', { params });
            return categories.data;
        } catch (err) {
            return ({ error: JSON.stringify(err) });
        }
    }

    async getCategoryByCategoryId(categoryId) {
        try {
            const category = await Service.get(`/categories/${categoryId}`);
            return category.data;
        } catch (err) {
            return ({ error: JSON.stringify(err) });
        }
    }
}
export default new CategoryService();