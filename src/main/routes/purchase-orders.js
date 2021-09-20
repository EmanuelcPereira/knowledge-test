const { adaptRoute } = require('../adapters/express-router-adapter');
const makeCreatePurchaseOrdersController = require('../factories/controllers/purchaseOrders/create-purchase-orders');
const makeFindAllPurchaseOrdersController = require('../factories/controllers/purchaseOrders/find-all-purchase-orders');
const makeDeletePurchaseOrderController = require('../factories/controllers/purchaseOrders/delete-purchase-orders');
const makeFindOnePurchaseOrderController = require('../factories/controllers/purchaseOrders/find-one-purchase-orders');

module.exports = (router) => {
    router.get('/orders', adaptRoute(makeFindAllPurchaseOrdersController()));
    router.get('/orders/:id', adaptRoute(makeFindOnePurchaseOrderController()));
    router.post('/orders', adaptRoute(makeCreatePurchaseOrdersController()));
    router.delete('/orders/:id', adaptRoute(makeDeletePurchaseOrderController()));
};
