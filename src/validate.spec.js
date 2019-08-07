import validate, {
  ValidateBase,
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
      it('pass just "min" param', () => {
        expect(validate.test('bl').lengthBetween({ min: 3 }).isValid).toBe(
          false
        );
        expect(validate.test('blah').lengthBetween({ min: 3 }).isValid).toBe(
          true
        );
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

    describe('messages', () => {
      it('if a message is passed to particular function and value is not valid then message is added to messages array', () => {
        expect(
          validate.test('test').isNumeric({ message: 'Value is not a number' })
            .messages
        ).toEqual(['Value is not a number']);
      });
      it('if a message is passed to different functions then they are added in order of chained functions', () => {
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

    describe('priorityMessage', () => {
      it('returns empty string if "isPriority = true" is not passed and value is invalid', () => {
        expect(
          validate
            .test('123')
            .isNumeric({ message: 'Value is not a number' })
            .hasUpperCase({ message: 'No uppercase' }).priorityMessage // this is invalid but "isPriority = true" not passed
        ).toEqual('');
      });
      it('returns only the priority message if "isPriority = true" and value is invalid', () => {
        expect(
          validate
            .test('test')
            .isNumeric({ message: 'Value is not a number' })
            .hasUpperCase({ message: 'No uppercase', isPriority: true })
            .priorityMessage
        ).toEqual('No uppercase');
      });
      it('returns only the last priority message if "isPriority = true" is passed to multiple methods and value is invalid', () => {
        expect(
          validate
            .test('test')
            .isNumeric({ message: 'Value is not a number', isPriority: true })
            .hasUpperCase({ message: 'No uppercase', isPriority: true })
            .priorityMessage
        ).toEqual('No uppercase');
      });
    });

    describe('errors', () => {
      it('returns empty array if valid as there are no errors', () => {
        expect(
          validate
            .test('123')
            .isNumeric({ message: 'Value is not a number' })
            .errors()
        ).toEqual([]);
      });
      it('returns an array with messages if invalid', () => {
        expect(
          validate
            .test('*&%$')
            .isNumeric({ message: 'Value is not a number' })
            .hasUpperCase({ message: 'No uppercase' })
            .hasLowerCase({ message: 'No lowercase' })
            .errors()
        ).toEqual(['Value is not a number', 'No uppercase', 'No lowercase']);
      });
      it('returns only the priority message if "isPriority: true" passed and value is invalid for that function - 1', () => {
        expect(
          validate
            .test('*&%$')
            .isNumeric({ message: 'Value is not a number', isPriority: true })
            .hasUpperCase({ message: 'No uppercase' })
            .hasLowerCase({ message: 'No lowercase' })
            .errors()
        ).toEqual(['Value is not a number']);
      });
      it('returns only the priority message if "isPriority: true" passed and value is invalid for that function - 2', () => {
        expect(
          validate
            .test('*$^%')
            .isNumeric({ message: 'Value is not a number' })
            .lengthBetween({
              min: 1,
              message: 'Not long enough',
              isPriority: true
            })
            .hasLowerCase({ message: 'No lowercase' })
            .errors()
        ).toEqual(['Value is not a number', 'No lowercase']);
      });
      it('returns all messages if "isPriority: true" passed but value is valid for that function', () => {
        expect(
          validate
            .test('123')
            .isNumeric({ message: 'Value is not a number', isPriority: true }) // this passes validation
            .isAlphabet({ message: 'Value is not a letter' })
            .hasLowerCase({ message: 'No lowercase' })
            .hasUpperCase({ message: 'No uppercase' })
            .errors()
        ).toEqual(['Value is not a letter', 'No lowercase', 'No uppercase']);
      });
      it('returns only the priority message if "isPriority: true" passed and value is invalid with "invert" function', () => {
        expect(
          validate
            .test('123')
            .invert('isNumeric', {
              message: "We don't want a number",
              isPriority: true
            }) // this fails validation as we want invert to fail the validation if value is a number
            .hasUpperCase({ message: 'No uppercase' })
            .errors()
        ).toEqual(["We don't want a number"]);
      });
      it('calls function passed as param if value invalid', () => {
        const funcMock = jest.fn();
        validate
          .test('123')
          .invert('isNumeric', {
            message: 'Value is a number',
            isPriority: true
          })
          .hasUpperCase({ message: 'No uppercase' })
          .errors(obj => funcMock(obj.isValid, obj.priorityMessage));
        expect(funcMock).toBeCalledWith(false, 'Value is a number');
      });
      it('does not call function passed as param if value valid', () => {
        const funcMock = jest.fn();
        validate
          .test('123')
          .isNumeric({ message: 'Value is not a number', isPriority: true })
          .errors(obj => funcMock(obj.isValid, obj.priorityMessage));
        expect(funcMock).toBeCalledTimes(0);
      });
    });
    it('returns only the priority message if "isPriority: true" passed to multiple functions', () => {
      expect(
        validate
          .test('123')
          .hasUpperCase({ message: 'No uppercase', isPriority: true })
          .lengthBetween({ min: 4, message: 'Too short', isPriority: true })
          .invert('isNumeric', {
            message: "We don't want a number",
            isPriority: true
          }) // this fails validation as we want invert to fail the validation if value is a number
          .errors()
      ).toEqual(["We don't want a number"]);
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

    describe('min and max params', () => {
      it('passed min and max returns true', () => {
        expect(
          isAlphanumeric({ value: 'abc123', min: 4, max: 6 }).isValid
        ).toBe(true);
      });
      it('passed min and max returns false', () => {
        expect(
          isAlphanumeric({ value: 'abc123', min: 2, max: 3 }).isValid
        ).toBe(false);
      });
    });
  });

  describe('Create new validation object', () => {
    it('New validation object correctly includes imported function', () => {
      const schema = new ValidateBase({
        isAlphabet
      });
      expect(schema.test('abc').isAlphabet().isValid).toBe(true);
      expect(schema.test('123').isAlphabet().isValid).toBe(false);
    });
    it('Create new validation function using imported function', () => {
      const schema = new ValidateBase({
        isNumeric,
        lengthBetween,
        postcode: ({ message } = {}) =>
          schema.matches({
            fn: value =>
              schema
                .test(value)
                .isNumeric()
                .lengthBetween({ min: 4, max: 4 }).isValid,
            message
          })
      });
      expect(schema.test(2000).postcode().isValid).toBe(true);
      expect(schema.test(20004).postcode().isValid).toBe(false);
    });
  });
});
