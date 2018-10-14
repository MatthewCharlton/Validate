var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var ValidateBase = function () {
  function ValidateBase() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, ValidateBase);

    this.test = function (value) {
      _this.value = value;
      _this.messages = [];
      _this.negate = false;
      _this.isValid = true;
      return _this;
    };

    this.matches = function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          value = _ref.value,
          regex = _ref.regex,
          fn = _ref.fn,
          min = _ref.min,
          max = _ref.max,
          message = _ref.message;

      value && _this.test(value);
      var match = regex && _this.value.toString().match(regex) || fn && fn(_this.value);
      var result = _this.isValid && (min || max) ? match && !!((min ? match.length >= min : match.length <= max) && (max ? match.length <= max : match.length >= min)) : !!match;
      _this.isValid = _this.isValid && (_this.negate ? !result : result);
      _this.negate && result && message && _this.messages.push(message) || !_this.negate && !result && message && _this.messages.push(message);
      return _this;
    };

    this.invert = function (funcName) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      _this.negate = true;
      _this[funcName].apply(_this, args);
      _this.negate = false;
      return _this;
    };

    Object.keys(config).map(function (fn) {
      return _this[fn] = config[fn];
    });
    this.value = '';
    this.messages = [];
    this.negate = false;
    this.isValid = false;
  }

  return ValidateBase;
}();

var hasDigits = function () {
  function hasDigits() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        value = _ref2.value,
        min = _ref2.min,
        max = _ref2.max,
        message = _ref2.message;

    return validate.matches({ regex: /\d/g, min: min, max: max, message: message, value: value });
  }

  return hasDigits;
}();

var hasUpperCase = function () {
  function hasUpperCase() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        value = _ref3.value,
        min = _ref3.min,
        max = _ref3.max,
        message = _ref3.message;

    return validate.matches({ regex: /[A-Z]/g, min: min, max: max, message: message, value: value });
  }

  return hasUpperCase;
}();

var hasLowerCase = function () {
  function hasLowerCase() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        value = _ref4.value,
        min = _ref4.min,
        max = _ref4.max,
        message = _ref4.message;

    return validate.matches({ regex: /[a-z]/g, min: min, max: max, message: message, value: value });
  }

  return hasLowerCase;
}();

var lengthBetween = function () {
  function lengthBetween(_ref5) {
    var value = _ref5.value,
        _ref5$min = _ref5.min,
        min = _ref5$min === undefined ? 0 : _ref5$min,
        _ref5$max = _ref5.max,
        max = _ref5$max === undefined ? '' : _ref5$max,
        message = _ref5.message;
    return validate.matches({ regex: '^.{' + min + ',' + max + '}$', message: message, value: value });
  }

  return lengthBetween;
}();

var isAlphanumeric = function () {
  function isAlphanumeric() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        value = _ref6.value,
        _ref6$min = _ref6.min,
        min = _ref6$min === undefined ? 0 : _ref6$min,
        _ref6$max = _ref6.max,
        max = _ref6$max === undefined ? '' : _ref6$max,
        message = _ref6.message;

    return validate.matches({
      regex: '^[a-zA-Z0-9]{' + min + ',' + max + '}$',
      message: message,
      value: value
    });
  }

  return isAlphanumeric;
}();

var isAlphabet = function () {
  function isAlphabet() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        value = _ref7.value,
        _ref7$min = _ref7.min,
        min = _ref7$min === undefined ? 0 : _ref7$min,
        _ref7$max = _ref7.max,
        max = _ref7$max === undefined ? '' : _ref7$max,
        message = _ref7.message;

    return validate.matches({
      regex: '^[a-zA-Z]{' + min + ',' + max + '}$',
      message: message,
      value: value
    });
  }

  return isAlphabet;
}();

var isNumeric = function () {
  function isNumeric() {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        value = _ref8.value,
        _ref8$min = _ref8.min,
        min = _ref8$min === undefined ? 0 : _ref8$min,
        _ref8$max = _ref8.max,
        max = _ref8$max === undefined ? '' : _ref8$max,
        message = _ref8.message;

    return validate.matches({ regex: '^[0-9.,]{' + min + ',' + max + '}$', message: message, value: value });
  }

  return isNumeric;
}();

var validate = new ValidateBase({
  hasDigits: hasDigits,
  hasUpperCase: hasUpperCase,
  hasLowerCase: hasLowerCase,
  isAlphanumeric: isAlphanumeric,
  isAlphabet: isAlphabet,
  isNumeric: isNumeric,
  lengthBetween: lengthBetween
});

export default validate;
export { ValidateBase, hasDigits, hasUpperCase, hasLowerCase, lengthBetween, isAlphanumeric, isAlphabet, isNumeric };
