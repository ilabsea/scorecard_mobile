import validationConstant from '../constants/validation_constant';
import validation from 'validate.js';

const validatePresent = (fieldName, value) => {
  return validationMsg(fieldName, value) == undefined ? true : false;
}

const validationService = (fieldName, value) => {
  const result = validationMsg(fieldName, value);
  if (result) {
    const message = getCustomMessage(fieldName, result)
    return message;
  }

  return null;
}

const validationMsg = (fieldName, value) => {
  let formValue = {};

  if (value == '') return undefined;

  formValue[fieldName] = value;

  let formField = {};
  formField[fieldName] = validationConstant[fieldName];

  return validation(formValue, formField);
};

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