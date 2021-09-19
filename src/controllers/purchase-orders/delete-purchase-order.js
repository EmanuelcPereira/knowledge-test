const { badRequest, noContent, serverError } = require('../../utils/http/http-helper');
const ServerError = require('../../../src/utils/errors/server');

module.exports = class DeletePurchaseOrderController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        try {
            const errors = await this.validation.validate(request.route);
            if (errors.length > 0) {
                console.log(errors);
                return badRequest(errors);
            }
            await this.repository.delete(request.route.id);
            return noContent();
        } catch (error) {
            return serverError(new ServerError(null));
        }
    }
};
