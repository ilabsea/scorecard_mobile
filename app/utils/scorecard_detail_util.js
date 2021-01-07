const getEachSectionPercentage = () => {
  // percentage = 1 divided by number of downloaded sections (indicator, lang_indicator, caf, audio, rating_scale, and program_lang) and mulipy with 100
  return 1/6;
}

const getDownloadPercentage = (amountOfData) => {
  let percentage = getEachSectionPercentage() * 100;
  return percentage / (amountOfData * 100);
}

export { getEachSectionPercentage, getDownloadPercentage };