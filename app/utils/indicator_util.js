const getIndicatorName = (indicatorName) => {
  return indicatorName.includes(':') ? indicatorName.split(':').pop() : indicatorName;
}

const sortIndicatorByRaisedCount = (indicators) => {
  return indicators.sort((a, b) => b.raised_count - a.raised_count);
}

export { getIndicatorName, sortIndicatorByRaisedCount };