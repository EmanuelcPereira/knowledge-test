const { badRequest, noContent, serverError } = require('../../utils/http/http-helper');

module.exports = class CreatePurchaseOrdersController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        try {
            const errors = await this.validation.validate(request.body);
            if (errors.length > 0) {
                return badRequest(errors);
            }

            const serializePurchaseOrdersToDb = this.serializePurchaseOrdersToDb(request.body);
            await this.repository.create(serializePurchaseOrdersToDb);
            return noContent();
        } catch (error) {
            return serverError(error);
        }
    }

    serializePurchaseOrdersToDb(purchaseOrders) {
        purchaseOrders = Array.isArray(purchaseOrders) ? purchaseOrders : [purchaseOrders];

        return purchaseOrders.map(purchaseOrder => ([
            purchaseOrder.product_id,
            purchaseOrder.price,
            purchaseOrder.deletion_flag,
        ]));
    }
};
