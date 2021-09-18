const PurchaseOrdersRepositorySpy = require('../mocks/mock-purchase-orders-repository');
const FindOnePurchaseOrdersController = require('../../../src/controllers/purchase-orders/find-one-purchase-orders');
const ValidationSpy = require('../mocks/mock-validation');

const mockOrder = () => ({
    id: 'valid_purchase_order_id',
});

const mockRequest = () => {
    return {
        params: mockOrder(),
    };
};

const makeSut = () => {
    const validationSpy = new ValidationSpy();
    const purchaseOrderRepositorySpy = new PurchaseOrdersRepositorySpy();
    const sut = new FindOnePurchaseOrdersController(purchaseOrderRepositorySpy, validationSpy);
    return {
        sut,
        validationSpy,
        purchaseOrderRepositorySpy,
    };
};

describe('FindOnePurchaseOrders Controller', () => {
    it('should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request.params);
    });
});
