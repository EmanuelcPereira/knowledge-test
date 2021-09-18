const { badRequest } = require('../../utils/http/http-helper');


module.exports = class FindOnePurchaseOrdersController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        const error = await this.validation.validate(request.params);
        if (error.length > 0) {
            return badRequest(error);
        }
        return null;
    }
};
