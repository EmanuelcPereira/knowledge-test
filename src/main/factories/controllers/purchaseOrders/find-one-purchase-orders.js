const PurchaseOrdersRepository = require('../../../../repositories/purchase-orders');
const FindOnePurchaseOrdersController = require('../../../../controllers/purchase-orders/find-one-purchase-orders');

module.exports = () => {
    const repository = new PurchaseOrdersRepository();

    return new FindOnePurchaseOrdersController(repository);
};
