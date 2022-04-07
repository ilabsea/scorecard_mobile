import validationService from './validation_service';

const endpointFormService = (() => {
  return {
    isValidForm
  }

  function isValidForm(endpointLabel, endpointValue) {
    const endpointLabelValidationMsg = validateField('endpointLabel', endpointLabel);
    const endpointValueValidationMsg = validateField('endpointValue', endpointValue );
    let isFormValid = true;

    if (endpointLabelValidationMsg != null || endpointValueValidationMsg != null)
      isFormValid = false;

    return isFormValid;
  }

  // private method
  function validateField(fieldName, value) {
    validationService(fieldName, value === '' ? undefined : value);
  }
})();

export default endpointFormService;