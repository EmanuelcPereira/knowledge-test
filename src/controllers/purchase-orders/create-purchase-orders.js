

module.exports = class CreatePurchaseOrdersController {
    constructor(validation) {
        this.validation = validation;
    }

    async handle(request) {
        await this.validation.validate(request.body);
        return new Promise(resolve => resolve(null));
    }
};
