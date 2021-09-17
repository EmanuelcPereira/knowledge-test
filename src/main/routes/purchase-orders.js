const { adaptRoute } = require('../adapters/express-router-adapter');
const makeCreatePurchaseOrdersController = require('../factories/controllers/purchaseOrders/create-purchase-orders');
const makeFindAllPurchaseOrdersController = require('../factories/controllers/purchaseOrders/find-all-purchase-orders');

module.exports = (router) => {
    router.get('/orders', adaptRoute(makeFindAllPurchaseOrdersController()));
    router.post('/orders', adaptRoute(makeCreatePurchaseOrdersController()));
};
