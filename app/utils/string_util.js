const isBlank = (value) => {
  if (value === '' || value === undefined || value === null)
    return true;

  return false;
}

// Check if string contains only digits
const isNumber = (value) => {
  return /^\d+$/.test(value);
}

const extractNumber = (value) => {
  return value.replace(/[^0-9]/g, '');
}

export { isBlank, isNumber, extractNumber }