module.exports = class PurchaseOrdersRepositorySpy {
    constructor() {
        this.result = 0;
    }

    async findOne(id) {
        this.id = id;
        return this.result;
    }

    async findAll() {
        return this.result;
    }

    async create(params) {
        this.params = params;
        return this.result;
    }

    async delete(id) {
        this.id = id;
        return this.result;
    }
};
