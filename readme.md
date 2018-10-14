# Matts Sick Validation Func

Probably the best validation utility ever made.

### Installing

```
npm i --save matts-sick-validation-func
```

### Usage

#### Main validation function

Import the main validate function

Using JS modules

```
import validate from 'matts-sick-validation-func';
```

OR using require e.g. Node JS

```
const validate = require('matts-sick-validation-func').default;
```

Then begin testing

```
validate.test('123').isNumeric().isValid  // true
validate.test('ABC').isNumeric().isValid  // false
```

You can also chain functions together

```
validate.test('Abc123').hasUpperCase().hasDigits().isValid  // true
```

#### Function parameters

You can pass an object to refine your validation requirements

- value: Value to validate when using stand-alone functions ( not to be used when using main validate function or chaining )
- regex: Regex pattern literal or string used to validate ( e.g. \/\^[a-z]\$\/ or '\^[a-z]\$' )
- fn: Function that is used to validate ( value is automatically passed into function as parameter )
- min: Minimum number characters that must match to be valid
- max: Maximum number characters that must match to be valid
- message: String that will be shown when validation does not meet requirements

Examples

```
isAlphabet({ value: 'ABC', min: 2, max: 3 }).isValid  // true
isAlphabet({ value: 'ABCD', min: 2, max: 3 }).isValid  // false
isAlphabet({ value: 'ABCD', min: 2, max: 3, message: 'Cannot be longer than 4 characters' }).messages  // ['Cannot be longer than 4 characters']
validate.test('test').isNumeric({ message: 'Value is not a number' }).hasUpperCase({ message: 'Value does not have uppercase characters'}).messages  // ['Value is not a number', 'Value does not have uppercase characters']
validate.test('Abc 123').matches({ fn: (val) => exampleDbQueryFunction(val).length > 0 }).isValid  // true
```

#### Stand-alone functions

You can import stand-alone functions too which can help tree-shaking

- hasDigits
- hasUpperCase
- hasLowerCase
- isAlphanumeric
- isAlphabet
- isNumeric
- lengthBetween
- matches

```
import { isAlphabet, isNumeric } from 'matts-sick-validation-func';
isAlphabet({ value: 'ABC' }).isValid  // true
isAlphabet({ value: '123' }).isValid  // false
isNumeric({ value: '123' }).isValid  // true
```

If you wish to use a custom regex use the **matches** function

```
validate.test('Abc 123').matches({ regex: /[a-zA-Z\s\d]/ }).isValid  // true
```

Reverse validation result with **invert** function - pass the function you wish to invert as first parameter then that functions arguments as the second - the example below shows reversing the matches example above

```
validate.test('Abc 123').invert('matches', { regex: /[a-zA-Z\s\d]/ }).isValid  // false
```

#### Extend with your own functions

Import the base ValidateBase function and pass in an object

```
import { ValidateBase } from 'matts-sick-validation-func';
const customValidate = new ValidateBase({
  isWebAddress: ({ value, min = 0, max = '', message } = {}) =>
    customValidate.matches({
      regex: `^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+\.[a-z]+(\/[a-zA-Z0-9.#]+\/?){${min},${max}}$`,
      message,
      value
    })
});
```
