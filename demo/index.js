const validate = require('../dist/matts-sick-validation-func.common.js')
  .default;

console.log(
  'validate',
  validate
    .test('abc')
    .isAlphabet()
    .hasLowerCase().isValid
);

const {
  ValidateBase,
  isAlphabet,
  lengthBetween,
  isNumeric
} = require('../dist/matts-sick-validation-func.common.js');

console.log(
  'individual',
  isAlphabet({ value: 'abc' }).isValid && isNumeric({ value: '123' }).isValid
);

const customValidate = new ValidateBase({
  isAlphabet,
  lengthBetween,
  username: ({ message } = {}) =>
    customValidate.matches({
      fn: value =>
        customValidate
          .test(value)
          .isAlphabet()
          .lengthBetween({ min: 2, max: 5 }).isValid,
      message
    }),
  website: ({ value, message } = {}) =>
    customValidate.matches({
      regex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
      message,
      value
    })
});

console.log('username', customValidate.test('sas').username().isValid);
console.log('website', customValidate.test('www.blah_com').website().isValid);
