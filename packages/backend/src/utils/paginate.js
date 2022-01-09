const paginate = (options) => {
    let sort;
    if (options.sortBy) {
        const sortingCriteria = [];
        options.sortBy.split(',').forEach((sortOption) => {
            const [key, order] = sortOption.split(':');
            const value = (order === 'desc') ? order : 'asc';
            sortingCriteria.push({ column: key, order: value });
        });
        sort = sortingCriteria;
    } else {
        sort = [{
            column: 'created_at',
            order: 'asc',
        }];
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const offset = (page - 1) * limit;

    const criteria = {
        sort,
        limit,
        page,
        offset,
    };
    return criteria;
};

export default paginate;
