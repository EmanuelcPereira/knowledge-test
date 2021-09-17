const PurchaseOrdersRepository = require('../../../../repositories/purchase-orders');
const makeCreatePurchaseOrderValidators = require('../../validators/purchase-order/create-purchase-order');
const CreatePurchaseOrdersController = require('../../../../controllers/purchase-orders/create-purchase-orders');

module.exports = () => {
    const repository = new PurchaseOrdersRepository();
    const validators = makeCreatePurchaseOrderValidators();

    return new CreatePurchaseOrdersController(repository, validators);
};

