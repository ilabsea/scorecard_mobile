import React, { useContext } from 'react';

import { LocalizationContext } from './Translations';
import ProgressHeader from './Share/ProgressHeader';
import scorecardProgress from '../db/jsons/scorecardProgress';

const HorizontalProgressHeader = (props) => {
  const { translations } = useContext(LocalizationContext);
  const steps = scorecardProgress.map(x => translations[x.label]);

  return (
    <ProgressHeader
      title={ props.title }
      steps={ steps }
      progressIndex={ props.progressIndex }/>
  );
}

export default HorizontalProgressHeader;
