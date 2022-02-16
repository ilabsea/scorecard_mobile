const getIndicatorName = (indicatorName) => {
  return indicatorName.includes(':') ? indicatorName.split(':').pop() : indicatorName;
}

const getIndicatorShortcutName = (indicatorName) => {
  return indicatorName.includes(':') ? indicatorName.split(':')[0] : indicatorName.substr(0, 4);
}

const sortIndicatorByRaisedCount = (indicators) => {
  return indicators.sort((a, b) => b.raised_count - a.raised_count);
}

export { getIndicatorName, getIndicatorShortcutName, sortIndicatorByRaisedCount };