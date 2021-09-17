const { adaptRoute } = require('../adapters/express-router-adapter');
const makeCreatePurchaseOrdersController = require('../factories/controllers/purchaseOrders/create-purchase-orders');

module.exports = (router) => {
    router.post('/orders', adaptRoute(makeCreatePurchaseOrdersController()));
};
