const { success } = require('../../utils/http/http-helper');


module.exports = class FindAllPurchaseOrdersController {
    constructor(repository) {
        this.repository = repository;
    }

    async handle() {
        const purchaseOrders = await this.repository.findAll();
        return success({ purchaseOrders });
    }
};
