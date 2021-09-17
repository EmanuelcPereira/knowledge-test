const { success } = require('../../../src/utils/http/http-helper');
const PurchaseOrderRepositorySpy = require('../mocks/mock-purchase-orders-repository');
const FindAllPurchaseOrdersController = require('../../../src/controllers/purchase-orders/find-all-purchase-orders');


const makeSut = () => {
    const purchaseOrderRepositorySpy = new PurchaseOrderRepositorySpy();
    const sut = new FindAllPurchaseOrdersController(purchaseOrderRepositorySpy);
    return {
        sut,
        purchaseOrderRepositorySpy
    };
};

describe('', () => {
    it('should return 200 if PurchaseOrderRepository returns purchase orders', async () => {
        const { sut, purchaseOrderRepositorySpy } = makeSut();
        purchaseOrderRepositorySpy.result = [];
        const httpResponse = await sut.handle();
        expect(httpResponse).toEqual(success({ purchaseOrders: [] }));
    });
});
