import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LocalizationContext } from './Translations';
import ScorecardPreferenceDatePickerMessage from './ScorecardPreference/ScorecardPreferenceDatePickerMessage';
import Color from '../themes/color';

import { getDeviceStyle } from '../utils/responsive_util';
import dateHelper from '../helpers/date_helper';
import { displayDateFormat } from '../constants/date_format_constant';
import DatePickerTabletStyles from '../styles/tablet/DatePickerComponentStyle';
import DatePickerFormMobileStyles from '../styles/mobile/DatePickerComponentStyle';

const styles = getDeviceStyle(DatePickerTabletStyles, DatePickerFormMobileStyles);

class DatePicker extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: Moment(props.date, 'DD/MM/YYYY').utcOffset(0, true).toDate(),
      isPickerVisible: false,
    };
  }

  onChange = (data) => {
    if (data.type == 'set') {
      const selectedDate = data.nativeEvent.timestamp;
      this.setState({
        selectedDate: selectedDate,
        isPickerVisible: false,
      });

      const formattedDate = Moment(selectedDate).format(displayDateFormat);
      this.props.onChangeDate(formattedDate);
    }

    this.setState({ isPickerVisible: false });
  }

  _renderDate = () => {
    return (
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => this.setState({ isPickerVisible: true })}
      >
        <Icon
          color={Color.inputBorderLineColor}
          name="calendar-today"
          style={styles.icon}
        />

        <Text style={styles.dateLabel}>{ Moment(this.state.selectedDate).format(displayDateFormat) }</Text>
      </TouchableOpacity>
    )
  }

  _renderCalendar = () => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={this.state.selectedDate}
        mode='date'
        display="default"
        minimumDate={dateHelper.getMinimumSelectDate()}
        maximumDate={dateHelper.getMaximumSelectDate()}
        onChange={(data) => this.onChange(data)}
      />
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {translations.date}
        </Text>
        { this._renderDate() }

        {this.state.isPickerVisible && (
          this._renderCalendar()
        )}

        <ScorecardPreferenceDatePickerMessage selectedDate={this.state.selectedDate} scorecard={this.props.scorecard} />
      </View>
    );
  }
}

export default DatePicker;