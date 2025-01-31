class APIFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.filters = {};
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludeFields = ['sort', 'fields', 'limit', 'page'];

    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.stock) {
      if (queryObj.stock === 'in-stock') {
        queryObj.stock = { gt: 0 };
      }
      if (queryObj.stock === 'out-of-stock') {
        queryObj.stock = 0;
      }
    }

    for (const key in queryObj) {
      if (queryObj[key] === 'all') delete queryObj[key];
    }

    this.filters = queryObj;

    let queryString = JSON.stringify(queryObj);

    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`,
    );

    this.query.find(JSON.parse(queryString));
  }

  sort() {
    let sortBy = '-createdAt';
    if (this.queryString.sort) {
      sortBy = this.queryString.sort.replaceAll(',', ' ');
    }
    this.query.sort(sortBy);
  }

  limitFields() {
    let fields = '-__v';
    if (this.queryString.fields) {
      fields = this.queryString.fields.replaceAll(',', ' ');
    }
    this.query = this.query.select(fields);
  }

  async paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
  }

  getFilter() {
    return this.filters;
  }
}

module.exports = APIFeature;
