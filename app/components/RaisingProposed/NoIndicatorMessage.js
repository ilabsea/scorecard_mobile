import React, { useContext } from 'react';

import {LocalizationContext} from '../Translations';
import NoDataMessage from '../NoDataMessage';

const NoIndicatorMessage = () => {
  const locale = useContext(LocalizationContext);

  return (
    <NoDataMessage
      title={locale.translations.noCustomIndicator}
      hideButton={true}
      contentContainerStyle={{height: 160, borderWidth: 0, marginTop: 20}}
    />
  )
}

export default NoIndicatorMessage;