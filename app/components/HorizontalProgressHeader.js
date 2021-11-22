import React, { useContext } from 'react';

import { LocalizationContext } from './Translations';
import ProgressHeader from './ProgressHeader';
import scorecardProgress from '../db/jsons/scorecardProgress';

const HorizontalProgressHeader = (props) => {
  const { translations } = useContext(LocalizationContext);
  const steps = scorecardProgress.map(x => translations[x.label]);

  return (
    <ProgressHeader
      title={ props.title }
      steps={ steps }
      onPressHome={ () => props.navigation.popToTop() }
      progressIndex={ props.progressIndex }/>
  );
}

export default HorizontalProgressHeader;
