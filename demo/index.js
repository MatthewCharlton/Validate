const validate = require('../dist/matts-sick-validation-func.common.js')
  .default;

const {
  isAlphabet,
  isNumeric
} = require('../dist/matts-sick-validation-func.common.js');

console.log(
  isAlphabet({ value: '123' }).isValid && isNumeric({ value: '123' }).isValid
);

console.log(validate.test('abc').isAlphabet().isValid);

const {
  ValidateBase
} = require('../dist/matts-sick-validation-func.common.js');

const customValidate = new ValidateBase(
  {
    isWebAddress: ({ value, min = 0, max = '', message } = {}) =>
      customValidate.matches({
        regex: `^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+\.[a-z]+(\/[a-zA-Z0-9.#]+\/?){${min},${max}}$`,
        message,
        value
      })
  },
  {
    websiteField: value =>
      customValidate
        .test(value)
        .isWebAddress({ message: 'Not valid web address' }).isValid
  }
);

const { schema } = customValidate;

console.log(schema);

console.log(customValidate.test('www.blah.com').isWebAddress().isValid);
