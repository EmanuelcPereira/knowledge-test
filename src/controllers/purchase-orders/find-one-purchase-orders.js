const { badRequest, success, serverError } = require('../../utils/http/http-helper');


module.exports = class FindOnePurchaseOrdersController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        try {
            const error = await this.validation.validate(request.params);
            if (error.length > 0) {
                return badRequest(error);
            }
            const purchaseOrder = await this.repository.findOne(request.params);
            return success({ purchaseOrder });
        } catch (error) {
            return serverError(error);
        }
    }
};
