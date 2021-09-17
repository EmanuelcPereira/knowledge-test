const PurchaseOrdersRepository = require('../../src/repositories/purchase-orders');

jest.mock('../../src/main/factories/db', () => {
    return () => ({
        persistMany: () => mockCreatePurchaseOrdersParams().length,
        persist: () => mockDeletePurchaseOrdersParams().length,
        select: () => []
    });
});

const mockCreatePurchaseOrdersParams = () => ([[
    'valid_product_id',
    'valid_price',
    'valid_deletion_flag',
]]);

const mockDeletePurchaseOrdersParams = () => ([[
    'valid_purchaseOrder_id',
]]);

const makeSut = () => {
    return new PurchaseOrdersRepository();
};

describe('ProductsRepository', () => {
    describe('create()', () => {
        it('should return inserted rows length on success', async () => {
            const sut = makeSut();
            const params = mockCreatePurchaseOrdersParams();
            const insertedRows = await sut.create(params);
            expect(insertedRows).toBe(1);
        });
    });

    describe('findAll()', () => {
        it('should return products list', async () => {
            const sut = makeSut();
            const purchaseOrders = await sut.findAll();
            expect(purchaseOrders).toEqual([]);
        });
    });

    describe('delete()', () => {
        it('should set deletion_flag to 1', async () => {
            const sut = makeSut();
            const params = mockDeletePurchaseOrdersParams();
            const updatedRows = await sut.delete(params);
            expect(updatedRows).toBe(1);
        });
    });
});
