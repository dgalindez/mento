const validateUnits = require('./validateUnits');

describe('validateUnits', () => {
  it('Should succeed with standard', () => {
    const isValid = validateUnits('standard');
    expect(isValid).toBeTruthy();
  });

  it('Should succeed with metric', () => {
    const isValid = validateUnits('metric');
    expect(isValid).toBeTruthy();
  });

  it('Should succeed with imperial', () => {
    const isValid = validateUnits('imperial');
    expect(isValid).toBeTruthy();
  });

  it('Should fail with empty', () => {
    const isValid = validateUnits('');
    expect(isValid).toBeFalsy();
  });

  it('Should fail with something else', () => {
    const isValid = validateUnits('gibberish');
    expect(isValid).toBeFalsy();
  });
});
