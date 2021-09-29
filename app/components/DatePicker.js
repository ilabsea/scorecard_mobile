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
      selectedDate: Moment(props.date, displayDateFormat).toDate(),
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

  showDatePicker = () => {
    this.setState({ isPickerVisible: true });
    this.props.onOpenPicker();
  }

  _renderDate = () => {
    return (
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => this.showDatePicker()}
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
        minimumDate={dateHelper.getMinimumSelectedDate()}
        maximumDate={new Date()}
        onChange={(data) => this.onChange(data)}
      />
    )
  }

  _renderInfoMessage() {
    if (dateHelper.isBeforeCurrentDate(this.state.selectedDate)) {
      return (
        <Text style={styles.messageLabel}>{ this.context.translations.theSelectedDateIsInThePast }</Text>
      )
    }
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={[styles.container, { height: 90 }]}>
        <Text style={styles.label}>
          {translations.date}
        </Text>
        { this._renderDate() }

        {this.state.isPickerVisible && (
          this._renderCalendar()
        )}

        { this._renderInfoMessage() }
      </View>
    );
  }
}

export default DatePicker;