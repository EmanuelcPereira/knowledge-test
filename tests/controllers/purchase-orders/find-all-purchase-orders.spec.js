const { success, serverError } = require('../../../src/utils/http/http-helper');
const PurchaseOrderRepositorySpy = require('../mocks/mock-purchase-orders-repository');
const FindAllPurchaseOrdersController = require('../../../src/controllers/purchase-orders/find-all-purchase-orders');
const ServerError = require('../../../src/utils/errors/server');


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

    it('should return 500 if PurchaseOrderRepository findAll() throws', async () => {
        const { sut, purchaseOrderRepositorySpy } = makeSut();
        jest.spyOn(purchaseOrderRepositorySpy, 'findAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle();
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });
});
