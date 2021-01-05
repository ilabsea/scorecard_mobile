const getIndicatorName = (indicatorName) => {
  return indicatorName.includes(':') ? indicatorName.split(':').pop() : indicatorName;
}

const getIndicatorShortcutName = (indicatorName) => {
  return indicatorName.includes(':') ? indicatorName.split(':')[0] : indicatorName.substr(0, 4);
}

export { getIndicatorName, getIndicatorShortcutName };