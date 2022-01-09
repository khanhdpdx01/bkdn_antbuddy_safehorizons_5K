import knex from '../../config/connection';

class BaseRepository {
  constructor() {
    this.tableName = this.getTableName();
  }

  cloneQuery() {
    return knex(this.tableName).clone();
  }

  listByPagingAndSort(pagingAndSort = {}, columns = ['*']) {
    return this.cloneQuery().select(columns).orderBy(pagingAndSort.sort)
      .limit(pagingAndSort.limit)
      .offset(pagingAndSort.offset);
  }

  list(columns = ['*']) {
    return this.cloneQuery().select(columns);
  }

  listBy(clauses = {}, columns = ['*']) {
    return this.cloneQuery().where(clauses).select(columns);
  }

  listJoinBy(joinTableName, foreignKey, primaryKey, clauses = {}, columns = ['*']) {
    return this.cloneQuery().where(clauses).select(columns)
      .innerJoin(joinTableName, `${this.getTableName()}.${primaryKey}`, `${joinTableName}.${foreignKey}`);
  }

  listInBy(column, array, columns = ['*']) {
    return this.cloneQuery().whereIn(column, array).select(columns);
  }

  count() {
    return this.cloneQuery().count({ count: '*' });
  }

  countBy(clauses = {}) {
    return this.cloneQuery().where(clauses).count({ count: '*' });
  }

  getBy(clauses = {}, columns = ['*']) {
    return this.cloneQuery().where(clauses).select(columns).first();
  }

  getByOrCondition(clauses = [], columns = ['*']) {
    return this.cloneQuery().where(clauses[0]).orwhere(clauses.splice(0, 1)).select(columns)
      .first();
  }

  create(attributes = {}, returning = ['*']) {
    return this.cloneQuery().insert(attributes).returning(returning);
  }

  update(clauses = {}, attributes = {}, returning = ['*']) {
    return this.cloneQuery().where(clauses).update(attributes).returning(returning);
  }

  delete(clauses) {
    return this.cloneQuery().where(clauses).delete();
  }

  searchLike(clauses, search, columns = ['*']) {
    return this.cloneQuery().where(clauses, 'like', `%${search}%`).select(columns);
  }
}

export default BaseRepository;
