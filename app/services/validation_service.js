import validationConstraint from '../constants/validation_constraint';
import validation from 'validate.js';

const validationService = (fieldName, value) => {
  let formValue = {};
  if (value != '')
    formValue[fieldName] = value;

  let formField = {};
  formField[fieldName] = validationConstraint[fieldName];

  const result = validation(formValue, formField);
  if (result) {
    const message = getCustomMessage(fieldName, result)
    return message;
  }

  return null;
}

const getCustomMessage = (fieldName, result) => {
  let message = result[fieldName][0];

  if (message.includes('not a number'))
    message = fieldName + 'MustBeNumber';
  else if (message.includes('is the wrong length'))
    message = fieldName + 'HasIncorrectDigit';

  return message;
};;

export default validationService;