const PurchaseOrdersRepositorySpy = require('../mocks/mock-purchase-orders-repository');
const ValidationSpy = require('../mocks/mock-validation');
const DeletePurchaseOrderController = require('../../../src/controllers/purchase-orders/delete-purchase-order');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const faker = require('faker');
const { badRequest, noContent } = require('../../../src/utils/http/http-helper');

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

    it('should return 400 if validation return an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 204 on success', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(noContent());
    });
});
