const PurchaseOrdersRepository = require('../../../../repositories/purchase-orders');
const makeDeletePurchaseOrderValidators = require('../../validators/purchase-order/delete-purchase-order');
const DeletePurchaseOrdersController = require('../../../../controllers/purchase-orders/delete-purchase-order');

module.exports = () => {
    const repository = new PurchaseOrdersRepository();
    const validators = makeDeletePurchaseOrderValidators();

    return new DeletePurchaseOrdersController(repository, validators);
};
