const isKhmerLanguage = (language) => {
  if (language.value.includes('km') || language.value.includes('kh'))
    return true;

  return false;
}

export { isKhmerLanguage };