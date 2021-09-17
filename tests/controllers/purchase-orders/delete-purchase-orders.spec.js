const PurchaseOrdersRepositorySpy = require('../mocks/mock-purchase-orders-repository');
const ValidationSpy = require('../mocks/mock-validation');
const DeletePurchaseOrderController = require('../../../src/controllers/purchase-orders/delete-purchase-order');

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
    const sut = new DeletePurchaseOrderController(purchaseOrderRepositorySpy, validationSpy);
    return {
        sut,
        validationSpy,
        purchaseOrderRepositorySpy,
    };
};

describe('', () => {
    it('should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request.params);
    });
});
