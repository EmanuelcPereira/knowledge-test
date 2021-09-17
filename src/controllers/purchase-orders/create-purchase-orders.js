const { badRequest } = require('../../utils/http/http-helper');


module.exports = class CreatePurchaseOrdersController {
    constructor(validation) {
        this.validation = validation;
    }

    async handle(request) {
        const errors = await this.validation.validate(request.body);
        if (errors.length > 0) {
            return badRequest(errors);
        }
        return new Promise(resolve => resolve(null));
    }
};
