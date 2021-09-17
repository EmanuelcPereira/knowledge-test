

module.exports = class DeletePurchaseOrderController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        await this.validation.validate(request.params);
        return new Promise(resolve => resolve(null));
    }
};
