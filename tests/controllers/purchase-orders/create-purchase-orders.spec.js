const faker = require('faker');

const ValidationSpy = require('../mocks/mock-validation');
const CreatePurchaseOrdersController = require('../../../src/controllers/purchase-orders/create-purchase-orders');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const { badRequest, noContent } = require('../../../src/utils/http/http-helper');
const PurchaseOrderRepositorySpy = require('../mocks/mock-purchase-orders-repository');

const mockProduct = () => ({
    product_id: 'valid_product_id',
    price: 'valid_price',
    deletion_flag: 'valid_deletion_flag'
});

const mockRequest = () => {
    return {
        body: mockProduct(),
    };
};

const mockArrayRequest = () => {
    return {
        body: [
            mockProduct(),
            mockProduct(),
        ]
    };
};

const makeSut = () => {
    const validationSpy = new ValidationSpy();
    const purchaseOrderRepositorySpy = new PurchaseOrderRepositorySpy();
    const sut = new CreatePurchaseOrdersController(purchaseOrderRepositorySpy, validationSpy);

    return {
        sut,
        validationSpy,
        purchaseOrderRepositorySpy,
    };
};

describe('CreatePurchaseOrder Controller', () => {
    it('should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request.body);
    });

    it('should return 400 if validation return an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 400 if validation return an error array', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockArrayRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 204 on success', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(noContent());
    });
});
