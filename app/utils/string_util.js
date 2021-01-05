const isBlank = (value) => {
  if (value === '' || value === undefined || value === null)
    return true;

  return false;
}

export { isBlank }