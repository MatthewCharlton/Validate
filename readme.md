# Matts Sick Validation Func

Probably the best validation utility ever made 😜

### Installing

```
npm i --save matts-sick-validation-func
```

### Usage

Import the main validate function

Using JS modules

```javascript
import validate from 'matts-sick-validation-func';
```

OR using require e.g. Node JS

```javascript
const validate = require('matts-sick-validation-func').default;
```

#### Getting started

Valid value example:

```javascript
const result = validate
  .test('Test value')
  .isAlphabet({ message: 'Value is not a letter' })
  .hasLowerCase({ message: 'No lowercase' })
  .hasUpperCase({ message: 'No uppercase' })
  .errors();

result.join(', '); // Outputs ''
```

Invalid value example:

```javascript
const result = validate
  .test('123')
  .isAlphabet({ message: 'Value is not a letter' })
  .hasLowerCase({ message: 'No lowercase' })
  .hasUpperCase({ message: 'No uppercase' })
  .errors();

result.join(', '); // Outputs 'Value is not a letter, No lowercase, No uppercase'
```

### Overview

#### Main validation function

Test value is valid

```javascript
validate.test('123').isNumeric().isValid; // true
validate.test('ABC').isNumeric().isValid; // false
```

You can also chain functions together

```javascript
validate
  .test('Abc123')
  .hasUpperCase()
  .hasDigits().isValid; // true
```

#### Function parameters

You can pass an object to refine your validation requirements

- **value**: Value to validate when using stand-alone functions ( not to be used when using main validate function or chaining )
- **regex**: Regex pattern literal or string used to validate ( e.g. \/\^[a-z]\$\/ or '\^[a-z]\$' )
- **fn**: Function that is used to validate ( value is automatically passed into function as parameter )
- **min**: Minimum number characters that must match to be valid
- **max**: Maximum number characters that must match to be valid
- **message**: String that will be shown when validation does not meet requirements
- **isPriority**: Boolean that will save the message to the priorityMessage property

Examples

```javascript
isAlphabet({ value: 'ABC', min: 2, max: 3 }).isValid  // true
isAlphabet({ value: 'ABCD', min: 2, max: 3 }).isValid  // false
isAlphabet({ value: 'ABCD', min: 2, max: 3, message: 'Too long!' }).messages  // ['Too long!']

validate
  .test('test')
  .isNumeric({ message: 'Value is not a number' })
  .hasUpperCase({ message: 'Value does not have uppercase characters'})
  .messages  // ['Value is not a number', 'Value does not have uppercase characters']

validate
  .test('Abc 123')
  .matches({ fn: (val) => exampleDbQueryFunction(val).length > 0 })
  .isValid  // true

validate
  .test('123')
  .isAlphabet({ message:'Not letters', isPriority = true })
  .hasUpperCase({ message: 'No uppercase' })
  .priorityMessage // 'Not letters'
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

```javascript
import { isAlphabet, isNumeric } from 'matts-sick-validation-func';

isAlphabet({ value: 'ABC' }).isValid; // true
isAlphabet({ value: '123' }).isValid; // false
isNumeric({ value: '123' }).isValid; // true
```

If you wish to use a custom regex use the **matches** function:

```javascript
validate.test('Abc 123').matches({ regex: /[a-zA-Z\s\d]/ }).isValid; // true
```

Reverse validation result with **invert** function - pass the function you wish to invert as first parameter then that functions arguments as the second - the example below shows reversing the matches example above:

```javascript
validate.test('Abc 123').invert('matches', { regex: /[a-zA-Z\s\d]/ }).isValid; // false
```

#### Check for errors with errors function

Aside from getting the result of a validation directly using `.isValid` or `.messages` you can call `.errors()` which will retrieve either the priorityMessage and output as an array or the messages array. You can alternatively pass in a function which is passed the whole validation object as a parameter and will only execute if the value is invalid

In the example below `isPriority` is not passed into any validate methods and no funciton is passed into `.errors()` so the result will be the messages array:

```javascript
validate
  .test('Abc 123')
  .isAlphabet({ message: 'Not all letters' })
  .invert('matches', { regex: /[a-zA-Z\s\d]/, message: 'Value is invalid' })
  .errors(); // ['Not all letters', 'Value is invalid']
```

In the example below a function is passed into `.errors()` and the function will be called if the value is invalid:

```javascript
const doSomethingWithMessages = ({ messages }) => {
  console.log(messages);
};

validate
  .test('Abc 123')
  .invert('matches', { regex: /[a-zA-Z\s\d]/, message: 'Value is invalid' })
  .errors(doSomethingWithMessages); // logs messages array
```

#### Extend with your own functions

Import the base ValidateBase function and pass in an object with your custom named functions using the **matches** function

```javascript
import { ValidateBase } from 'matts-sick-validation-func';

const customValidate = new ValidateBase({
  isWebAddress: ({ value, min = 0, max = '', message } = {}) =>
    customValidate.matches({
      value,
      regex: `^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+\.[a-z]+(\/[a-zA-Z0-9.#]+\/?){${min},${max}}$`,
      message,
      isPriority
    })
});
```
