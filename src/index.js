export class ValidateBase {
  constructor(config = {}) {
    Object.keys(config).map(fn => (this[fn] = config[fn]));
    this.value = '';
    this.messages = [];
    this.negate = false;
    this.isValid = false;
    this.priorityMessage = '';
  }

  test = value => {
    this.value = value;
    this.messages = [];
    this.negate = false;
    this.isValid = true;
    this.priorityMessage = '';
    return this;
  };

  matches = ({ value, regex, fn, min, max, message, isPriority } = {}) => {
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
    this.priorityMessage =
      (!this.isValid && isPriority && message) || this.priorityMessage;
    return this;
  };

  invert = (funcName, ...args) => {
    this.negate = true;
    this[funcName](...args);
    this.negate = false;
    return this;
  };

  errors = fn => {
    if (!this.isValid && fn) return fn(this);
    if (!this.isValid && this.priorityMessage) return [this.priorityMessage];
    return this.messages;
  };
}

export const hasDigits = ({
  value,
  min,
  max,
  message,
  isPriority = false
} = {}) =>
  validate.matches({ regex: /\d/g, min, max, message, value, isPriority });

export const hasUpperCase = ({
  value,
  min,
  max,
  message,
  isPriority = false
} = {}) =>
  validate.matches({ regex: /[A-Z]/g, min, max, message, value, isPriority });

export const hasLowerCase = ({
  value,
  min,
  max,
  message,
  isPriority = false
} = {}) =>
  validate.matches({ regex: /[a-z]/g, min, max, message, value, isPriority });

export const lengthBetween = ({
  value,
  min = 0,
  max = '',
  message,
  isPriority = false
}) =>
  validate.matches({ regex: `^.{${min},${max}}$`, message, value, isPriority });

export const isAlphanumeric = ({
  value,
  min = 0,
  max = '',
  message,
  isPriority = false
} = {}) =>
  validate.matches({
    regex: `^[a-zA-Z0-9]{${min},${max}}$`,
    message,
    value,
    isPriority
  });

export const isAlphabet = ({
  value,
  min = 0,
  max = '',
  message,
  isPriority = false
} = {}) =>
  validate.matches({
    regex: `^[a-zA-Z]{${min},${max}}$`,
    message,
    value,
    isPriority
  });

export const isNumeric = ({
  value,
  min = 0,
  max = '',
  message,
  isPriority = false
} = {}) =>
  validate.matches({
    regex: `^[0-9.,]{${min},${max}}$`,
    message,
    value,
    isPriority
  });

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
