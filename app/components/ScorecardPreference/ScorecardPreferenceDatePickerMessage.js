import React from 'react';
import { Text } from 'react-native';
import Moment from 'moment';

import { LocalizationContext } from '../Translations';

import { getDeviceStyle } from '../../utils/responsive_util';
import scorecardHelper from '../../helpers/scorecard_helper';
import DatePickerTabletStyles from '../../styles/tablet/DatePickerComponentStyle';
import DatePickerFormMobileStyles from '../../styles/mobile/DatePickerComponentStyle';

const styles = getDeviceStyle(DatePickerTabletStyles, DatePickerFormMobileStyles);

class ScorecardPreferenceDatePickerMessage extends React.Component {
  static contextType = LocalizationContext;

  getInfoMessage() {
    if (!this.props.scorecard.planned_start_date)
      return '';

    const { translations, appLanguage } = this.context;
    const {selectedDate, scorecard} = this.props;
    let formattedStartDate = Moment(scorecard.planned_start_date).format('DD/MM/YYYY');
    let formattedEndDate = Moment(scorecard.planned_end_date).format('DD/MM/YYYY')
    formattedStartDate = scorecardHelper.getTranslatedDate(formattedStartDate, appLanguage, 'DD MMM YYYY');
    formattedEndDate = scorecardHelper.getTranslatedDate(formattedEndDate, appLanguage, 'DD MMM YYYY');

    let message = '';

    // selected date is before planned start date
    if (Moment(selectedDate).isBefore(scorecard.planned_start_date))
      message = translations.formatString(translations.selectedDateIsBeforePlannedStartDate, formattedStartDate);

    // selected date is after planned end date
    if (Moment(selectedDate).isAfter(scorecard.planned_end_date))
      message = translations.formatString(translations.selectedDateIsAfterPlannedEndDate, formattedEndDate);

    return message;
  }

  render() {
    return (
      <Text style={styles.messageLabel}>{ this.getInfoMessage() }</Text>
    )
  }
}

export default ScorecardPreferenceDatePickerMessage;