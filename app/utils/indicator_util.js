const getIndicatorName = (indicatorName) => {
  return indicatorName.includes(':') ? indicatorName.split(':').pop() : indicatorName;
}

const sortIndicatorByProposedCount = (indicators) => {
  return indicators.sort((a, b) => b.proposed_count - a.proposed_count);
}

export { getIndicatorName, sortIndicatorByProposedCount };