const ValidationSpy = require('../mocks/mock-validation');
const CreatePurchaseOrdersController = require('../../../src/controllers/purchase-orders/create-purchase-orders');

const mockProduct = () => ({
    description: 'valid_description',
    supplier_id: 'valid_supplier_id',
});

const mockRequest = () => {
    return {
        body: mockProduct(),
    };
};

const makeSut = () => {
    const validationSpy = new ValidationSpy();
    const sut = new CreatePurchaseOrdersController(validationSpy);

    return {
        sut,
        validationSpy,
    };
};

describe('CreatePurchaseOrder Controller', () => {
    it('should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request.body);
    });
});
