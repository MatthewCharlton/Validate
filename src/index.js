export class ValidateBase {
  constructor(config = {}) {
    Object.keys(config).map(fn => (this[fn] = config[fn]));
    this.value = '';
    this.messages = [];
    this.negate = false;
    this.isValid = false;
  }

  test = value => {
    this.value = value;
    this.messages = [];
    this.negate = false;
    this.isValid = true;
    return this;
  };

  matches = ({ value, regex, fn, min, max, message } = {}) => {
    value && this.test(value);
    const match =
      (regex && this.value.toString().match(regex)) || (fn && fn(this.value));
    const result =
      this.isValid && (min || max)
        ? match &&
          !!(
            (min ? match.length >= min : match.length <= max) &&
            (max ? match.length <= max : match.length >= min)
          )
        : !!match;
    this.isValid = this.isValid && (this.negate ? !result : result);
    (this.negate && result && message && this.messages.push(message)) ||
      (!this.negate && !result && message && this.messages.push(message));
    return this;
  };

  invert = (funcName, ...args) => {
    this.negate = true;
    this[funcName](...args);
    this.negate = false;
    return this;
  };
}

export const hasDigits = ({ value, min, max, message } = {}) =>
  validate.matches({ regex: /\d/g, min, max, message, value });

export const hasUpperCase = ({ value, min, max, message } = {}) =>
  validate.matches({ regex: /[A-Z]/g, min, max, message, value });

export const hasLowerCase = ({ value, min, max, message } = {}) =>
  validate.matches({ regex: /[a-z]/g, min, max, message, value });

export const lengthBetween = ({ value, min = 0, max = '', message }) =>
  validate.matches({ regex: `^.{${min},${max}}$`, message, value });

export const isAlphanumeric = ({ value, min = 0, max = '', message } = {}) =>
  validate.matches({
    regex: `^[a-zA-Z0-9]{${min},${max}}$`,
    message,
    value
  });

export const isAlphabet = ({ value, min = 0, max = '', message } = {}) =>
  validate.matches({
    regex: `^[a-zA-Z]{${min},${max}}$`,
    message,
    value
  });

export const isNumeric = ({ value, min = 0, max = '', message } = {}) =>
  validate.matches({ regex: `^[0-9.,]{${min},${max}}$`, message, value });

const validate = new ValidateBase({
  hasDigits,
  hasUpperCase,
  hasLowerCase,
  isAlphanumeric,
  isAlphabet,
  isNumeric,
  lengthBetween
});

export default validate;
