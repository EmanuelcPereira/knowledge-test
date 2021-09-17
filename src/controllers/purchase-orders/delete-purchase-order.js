const { badRequest, noContent } = require('../../utils/http/http-helper');


module.exports = class DeletePurchaseOrderController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        const error = await this.validation.validate(request.params);
        if (error.length > 0) {
            return badRequest(error);
        }
        await this.repository.delete(request.params);
        return noContent();
    }
};
