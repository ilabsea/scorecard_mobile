import React, { useContext } from 'react';

import {LocalizationContext} from '../Translations';
import EmptyListAction from '../Share/EmptyListAction';

const EmptyIndicatorList = () => {
  const locale = useContext(LocalizationContext);

  return (
    <EmptyListAction
      title={locale.translations.noIndicator}
      hideButton={true}
      contentContainerStyle={{height: 160, borderWidth: 0, marginTop: 20}}
    />
  )
}

export default EmptyIndicatorList;