const PurchaseOrdersRepository = require('../../../../repositories/purchase-orders');
const FindOnePurchaseOrdersController = require('../../../../controllers/purchase-orders/find-one-purchase-orders');
const makeDeletePurchaseOrderValidators = require('../../validators/purchase-order/delete-purchase-order');


module.exports = () => {
    const repository = new PurchaseOrdersRepository();
    const validators = makeDeletePurchaseOrderValidators();

    return new FindOnePurchaseOrdersController(repository, validators);
};
