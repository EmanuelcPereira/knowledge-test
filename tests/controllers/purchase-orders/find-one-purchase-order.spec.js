const PurchaseOrdersRepositorySpy = require('../mocks/mock-purchase-orders-repository');
const FindOnePurchaseOrdersController = require('../../../src/controllers/purchase-orders/find-one-purchase-orders');
const ValidationSpy = require('../mocks/mock-validation');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const { badRequest, success } = require('../../../src/utils/http/http-helper');
const faker = require('faker');

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

    it('should return 400 if validation return an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 200 if PurchaseOrderRepository returns purchase orders', async () => {
        const { sut, purchaseOrderRepositorySpy } = makeSut();
        purchaseOrderRepositorySpy.result = [];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(success({ purchaseOrder: [] }));
    });
});
