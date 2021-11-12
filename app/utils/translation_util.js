const getPluralOrSingularWord = (number, singularWord, appLanguage, suffix) => {
  if (appLanguage == 'km')
    return singularWord;

  let newWord = singularWord;
  if (number > 1)
    newWord += suffix;

  return newWord;
}

const getReadableAppLanguage = (appLanguage) => {
  const languageDicationary = {
    en: 'English',
    km: 'ខ្មែរ',
  }

  return languageDicationary[appLanguage];
}

export { getPluralOrSingularWord, getReadableAppLanguage };