const getPluralOrSingularWord = (number, singularWord, appLanguage, suffix) => {
  if (appLanguage == 'km')
    return singularWord;

  let newWord = singularWord;
  if (number > 1)
    newWord += suffix;

  return newWord;
}

export { getPluralOrSingularWord };