const PurchaseOrdersRepositorySpy = require('../mocks/mock-purchase-orders-repository');
const ValidationSpy = require('../mocks/mock-validation');
const DeletePurchaseOrderController = require('../../../src/controllers/purchase-orders/delete-purchase-order');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const faker = require('faker');
const { badRequest, noContent, serverError } = require('../../../src/utils/http/http-helper');
const ServerError = require('../../../src/utils/errors/server');

const mockRequest = () => ({
    route: {
        id: 'valid_purchase_order_id',
    }
});

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

describe('DeletePurchaseOrders Controller', () => {
    it('should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut();
        await sut.handle(mockRequest());
        expect(validationSpy.input).toEqual(mockRequest().route);
    });

    it('should return 400 if validation return an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 500 if PurchaseOrderRepository findOne() throws', async () => {
        const { sut, purchaseOrderRepositorySpy } = makeSut();
        jest.spyOn(purchaseOrderRepositorySpy, 'findOne').mockReturnValueOnce(new Promise(resolve => resolve(null)));
        const httpResponse = await sut.handle(mockRequest().route);
        expect(httpResponse).toEqual(badRequest(null));
    });

    it('should return 204 on success', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(noContent());
    });

    it('should call PurchaseOrderRepository delete() with correct values', async () => {
        const { sut, purchaseOrderRepositorySpy } = makeSut();
        await sut.handle(mockRequest());
        expect(purchaseOrderRepositorySpy.id).toEqual(mockRequest().route.id);
    });

    it('should return 500 if PurchaseOrderRepository delete() throws', async () => {
        const { sut, purchaseOrderRepositorySpy } = makeSut();
        jest.spyOn(purchaseOrderRepositorySpy, 'delete').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });
});
