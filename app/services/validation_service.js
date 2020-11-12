import validationConstant from '../constants/validation_constant';
import validation from 'validate.js';

const validatePresent = (fieldName, value) => {
  let formValue = {};

  if(value == '') return false;
  
  formValue[fieldName] = value;

  let formField = {};
  formField[fieldName] = validationConstant[fieldName];

  return validation(formValue, formField) == undefined ? true : false;
}

const validationService = (fieldName, value) => {
  let formValue = {};
  if (value != '')
    formValue[fieldName] = value;

  let formField = {};
  formField[fieldName] = validationConstant[fieldName];

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
export {validatePresent};