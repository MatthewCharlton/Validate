import validate, {
  hasDigits,
  hasUpperCase,
  hasLowerCase,
  isAlphabet,
  isAlphanumeric,
  isNumeric,
  lengthBetween
} from '.';

describe('Validate', () => {
  describe('validate object with all functions', () => {
    describe('hasDigits', () => {
      it('if has digits returns true', () => {
        expect(validate.test('123').hasDigits().isValid).toBe(true);
      });
      it('if not has digits returns false', () => {
        expect(validate.test('test').hasDigits().isValid).toBe(false);
      });
      it('if has 2 digits returns true', () => {
        expect(validate.test('42').hasDigits({ min: 2 }).isValid).toBe(true);
      });
      it('if has between 2 and 4 digits returns true', () => {
        expect(validate.test('423').hasDigits({ min: 2, max: 4 }).isValid).toBe(
          true
        );
      });
      it('if has less than 2 or more than 4 digits returns false', () => {
        expect(
          validate.test('4233525').hasDigits({ min: 2, max: 4 }).isValid
        ).toBe(false);
        expect(validate.test('1').hasDigits({ min: 2, max: 4 }).isValid).toBe(
          false
        );
      });
    });
    describe('hasUpperCase', () => {
      it('if has uppercase returns true', () => {
        expect(validate.test('Test').hasUpperCase().isValid).toBe(true);
      });
      it('if not has uppercase returns false', () => {
        expect(validate.test('test').hasUpperCase().isValid).toBe(false);
      });
      it('if has 2 uppercase returns true', () => {
        expect(validate.test('TEst').hasUpperCase({ min: 2 }).isValid).toBe(
          true
        );
      });
      it('if has between 2 and 4 uppercase returns true', () => {
        expect(
          validate.test('TESt').hasUpperCase({ min: 2, max: 4 }).isValid
        ).toBe(true);
      });
      it('if has less than 2 or more than 4 uppercase returns false', () => {
        expect(
          validate.test('Test').hasUpperCase({ min: 2, max: 4 }).isValid
        ).toBe(false);
        expect(
          validate.test('TESTING').hasUpperCase({ min: 2, max: 4 }).isValid
        ).toBe(false);
      });
    });
    describe('hasLowerCase', () => {
      it('if has lowercase returns true', () => {
        expect(validate.test('test').hasLowerCase().isValid).toBe(true);
      });
      it('if not has lowercase returns false', () => {
        expect(validate.test('TEST').hasLowerCase().isValid).toBe(false);
      });
      it('if has 2 lowercase returns true', () => {
        expect(validate.test('teST').hasLowerCase(2).isValid).toBe(true);
      });
      it('if has between 2 and 4 lowercase returns true', () => {
        expect(
          validate.test('tEst').hasLowerCase({ min: 2, max: 4 }).isValid
        ).toBe(true);
      });
      it('if has less than 2 or more than 4 lowercase returns false', () => {
        expect(
          validate.test('TeST').hasLowerCase({ min: 2, max: 4 }).isValid
        ).toBe(false);
        expect(
          validate.test('testing').hasLowerCase({ min: 2, max: 4 }).isValid
        ).toBe(false);
      });
    });
    describe('lengthBetween', () => {
      it('if has length between 3 and 4 returns true', () => {
        expect(
          validate.test('bla').lengthBetween({ min: 3, max: 4 }).isValid
        ).toBe(true);
        expect(
          validate.test('blah').lengthBetween({ min: 3, max: 4 }).isValid
        ).toBe(true);
      });
      it('if has length less than 3 or more than 4 returns false', () => {
        expect(
          validate.test('bl').lengthBetween({ min: 3, max: 4 }).isValid
        ).toBe(false);
        expect(
          validate.test('TESTING').lengthBetween({ min: 3, max: 4 }).isValid
        ).toBe(false);
      });
    });
    describe('isAlphanumeric', () => {
      it('if has alphanumeric characters returns true', () => {
        expect(validate.test('Blah123').isAlphanumeric().isValid).toBe(true);
      });
      it('if does not have alphanumeric characters returns false', () => {
        expect(validate.test('[]|<>.]').isAlphanumeric().isValid).toBe(false);
      });
    });
    describe('isAlphabet', () => {
      it('if has only alphabet characters returns true', () => {
        expect(validate.test('blah').isAlphabet().isValid).toBe(true);
      });
      it('if does not have only alphabet characters returns false', () => {
        expect(validate.test('Blah123').isAlphabet().isValid).toBe(false);
      });
    });
    describe('isNumeric', () => {
      it('if has only numbers returns true', () => {
        expect(validate.test('123').isNumeric().isValid).toBe(true);
      });
      it('if does not have only numbers returns false', () => {
        expect(validate.test('Blah123').isNumeric().isValid).toBe(false);
      });
    });
    describe('matches', () => {
      it('if regex argument matches returns true', () => {
        describe('regex', () => {
          expect(
            validate.test('123').matches({ regex: /^(123)$/ }).isValid
          ).toBe(true);
        });
      });
      it('if regex argument does not match returns false', () => {
        expect(
          validate.test('blah').matches({ regex: /^(123)$/ }).isValid
        ).toBe(false);
      });
      describe('fn', () => {
        it('when a function is passed to matches it evaluates the return value', () => {
          expect(
            validate.test('blah').matches({ fn: () => false }).isValid
          ).toBe(false);
        });
        it('it evaluates the return value with min count results', () => {
          expect(
            validate.test('blah').matches({ fn: () => [1, 2], min: 2 }).isValid
          ).toBe(true);
        });
        it('it has access to this.value within Validation object', () => {
          expect(
            validate.test('blah').matches({ fn: value => value === 'blah' })
              .isValid
          ).toBe(true);
        });
      });
    });
    describe('invert', () => {
      it('if invert called on validate function name returns opposite boolean, so this passes true but will return false', () => {
        expect(validate.test('123').invert('isNumeric').isValid).toBe(false);
      });
      it('if invert called on validate function name returns opposite boolean, so this passes false but will return true', () => {
        expect(
          validate.test('test').invert('matches', { regex: /^(123)$/ }).isValid
        ).toBe(true);
      });
    });
    describe('error messages', () => {
      it('if a message is passed to particular function and value is not valid then message is output in array', () => {
        expect(
          validate.test('test').isNumeric({ message: 'Value is not a number' })
            .messages
        ).toEqual(['Value is not a number']);
      });
      it('if a message is passed to different functions then they are output in order of chained functions', () => {
        expect(
          validate
            .test('test')
            .isNumeric({ message: 'Value is not a number' })
            .hasUpperCase({
              message: 'Value does not have uppercase characters'
            }).messages
        ).toEqual([
          'Value is not a number',
          'Value does not have uppercase characters'
        ]);
      });
    });
  });

  describe('Stand-alone validation functions', () => {
    describe('hasDigits', () => {
      it('passed value is true', () => {
        expect(hasDigits({ value: '567' }).isValid).toBe(true);
      });
      it('passed value is false', () => {
        expect(hasDigits({ value: 'abc' }).isValid).toBe(false);
      });
    });

    describe('hasUpperCase', () => {
      it('passed value is true', () => {
        expect(hasUpperCase({ value: 'Test' }).isValid).toBe(true);
      });
      it('passed value is false', () => {
        expect(hasUpperCase({ value: 'abc' }).isValid).toBe(false);
      });
    });

    describe('hasLowerCase', () => {
      it('passed value is true', () => {
        expect(hasLowerCase({ value: 'Test' }).isValid).toBe(true);
      });
      it('passed value is false', () => {
        expect(hasLowerCase({ value: 'ABC' }).isValid).toBe(false);
      });
    });

    describe('isAlphabet', () => {
      it('passed value is true', () => {
        expect(isAlphabet({ value: 'abc' }).isValid).toBe(true);
      });
      it('passed value is false', () => {
        expect(isAlphabet({ value: '123' }).isValid).toBe(false);
      });
    });

    describe('isAlphanumeric', () => {
      it('passed value is true', () => {
        expect(isAlphanumeric({ value: 'abc123' }).isValid).toBe(true);
      });
      it('passed value is false', () => {
        expect(isAlphanumeric({ value: '{?[]}' }).isValid).toBe(false);
      });
    });

    describe('isNumeric', () => {
      it('passed value is true', () => {
        expect(isNumeric({ value: '567' }).isValid).toBe(true);
      });
      it('passed value is false', () => {
        expect(isNumeric({ value: 'abc' }).isValid).toBe(false);
      });
    });

    describe('lengthBetween', () => {
      it('passed value is true', () => {
        expect(lengthBetween({ value: '567', min: 2, max: 3 }).isValid).toBe(
          true
        );
      });
      it('passed value is false', () => {
        expect(lengthBetween({ value: '1234', min: 2, max: 3 }).isValid).toBe(
          false
        );
      });
    });
  });
});
