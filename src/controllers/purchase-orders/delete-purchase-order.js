const { badRequest } = require('../../utils/http/http-helper');


module.exports = class DeletePurchaseOrderController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        const error = await this.validation.validate(request.params);
        if (error) {
            return badRequest(error);
        }
        return new Promise(resolve => resolve(null));
    }
};
