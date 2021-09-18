const RequiredFieldValidator = require('../../../../validators/required-field');
const SchemaValidator = require('../../../../validators/schema');
const ValidationComposite = require('../../../../validators/validation-composite');


const getMandatoryFields = () => [
    'id',
    'deletion_flag',
];

const getSchema = () => ({
    id: value => typeof value === 'number',
    deletion_flag: value => typeof value === 'string' && value.length <= 1,
});

module.exports = () => {
    const validations = [];
    const fields = getMandatoryFields();
    const schema = getSchema();

    validations.push(new RequiredFieldValidator(fields));
    validations.push(new SchemaValidator(schema));

    return new ValidationComposite(validations);
};
