import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Subheading} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

import {LocalizationContext} from '../../components/Translations';

import Color from '../../themes/color';

class ScorecardPreference extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        {label: 'Khmer', value: 'km'},
        {label: 'English', value: 'en'},
      ],
      textLanguage: '',
      audioLanguage: '',
      date: Moment().format('DD/MM/YYYY'),
    };
  }

  dropDownArrowRight = () => {
    const {translations} = this.context;
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: Color.clickableColor, textTransform: 'uppercase'}}>
          {translations['choose']}
        </Text>
        <MaterialIcon
          size={25}
          name="keyboard-arrow-down"
          style={{marginTop: -2}}
        />
      </View>
    );
  };

  changeLanugage = (item, type) => {
    if (type === 'text') {
      console.log('Change text language == ', item.value);
      this.setState({textLanguage: item.value});
    }
    else
      this.setState({audioLanguage: item.value});
  };

  getPickerDefaultValue = (value) => {
    if (value != '' && value != undefined)
      return value.toString();

    return null;
  };

  renderForm = () => {
    const {translations} = this.context;
    const {languages, textLanguage, audioLanguage} = this.state;
    return (
      <View style={{marginTop: 10}}>
        <View style={styles.dropDownContainer}>
          <Text style={[styles.inputLabel, {top: -15, zIndex: 10}]}>
            {translations['date']}
          </Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            minDate={Moment().format('DD/MM/YYYY')}
            style={{width: '100%'}}
            customStyles={{
              dateInput: {
                height: 50,
                paddingLeft: 60,
                borderColor: Color.inputBorderLineColor,
                borderWidth: 2,
                borderRadius: 4,
                alignItems: 'flex-start',
              },
            }}
            iconComponent={
              <MaterialIcon
                size={25}
                color={Color.inputBorderLineColor}
                name="calendar-today"
                style={{position: 'absolute', left: 16}}
              />
            }
            onDateChange={(date) => {
              this.setState({date: date});
            }}
          />
        </View>

        <View style={styles.dropDownContainer}>
          <Text style={[styles.inputLabel, {zIndex: 6001}]}>
            {translations['textDisplayIn']}
          </Text>
          <DropDownPicker
            items={languages}
            defaultValue={
              languages.length > 1
                ? this.getPickerDefaultValue(textLanguage)
                : null
            }
            placeholder={translations['selectLanguage']}
            searchablePlaceholder={translations['searchForLanguage']}
            zIndex={6000}
            searchable={true}
            containerStyle={styles.dropDownContainerStyle}
            style={styles.dropDownPickerStyle}
            itemStyle={{justifyContent: 'flex-start'}}
            dropDownMaxHeight={200}
            dropDownStyle={{
              backgroundColor: 'white',
              opacity: 100,
              zIndex: 6000,
            }}
            customArrowDown={() => this.dropDownArrowRight()}
            onChangeItem={(item) => this.changeLanugage(item, 'text')}
          />
        </View>

        <View style={styles.dropDownContainer}>
          <Text style={[styles.inputLabel, {zIndex: 5001}]}>
            {translations['audioPlayIn']}
          </Text>
          <DropDownPicker
            items={languages}
            defaultValue={
              languages.length > 1
                ? this.getPickerDefaultValue(audioLanguage)
                : null
            }
            placeholder={translations['selectLanguage']}
            searchablePlaceholder={translations['searchForLanguage']}
            zIndex={5000}
            searchable={true}
            containerStyle={styles.dropDownContainerStyle}
            style={styles.dropDownPickerStyle}
            itemStyle={{justifyContent: 'flex-start'}}
            dropDownMaxHeight={200}
            dropDownStyle={{backgroundColor: 'white', opacity: 100}}
            customArrowDown={() => this.dropDownArrowRight()}
            onChangeItem={(item) => this.changeLanugage(item, 'audio')}
          />
        </View>

        <Button
          mode="contained"
          uppercase={true}
          contentStyle={{height: 50}}
          color={Color.primaryColor}
          labelStyle={{fontSize: 18}}
          style={{marginTop: 150}}
        >
          {translations['next']}
        </Button>
      </View>
    );
  };

  render() {
    const {translations} = this.context;

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
          {translations['scorecardPreference']}
        </Text>
        <Subheading style={{color: 'gray'}}>
          {translations['pleaseFillInformationBelow']}
        </Subheading>
        {this.renderForm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headline: {
    color: Color.primaryColor,
    fontSize: 25,
    fontWeight: '700',
  },
  inputLabel: {
    backgroundColor: 'white',
    color: Color.inputBorderLineColor,
    fontWeight: '700',
    marginLeft: 12,
    paddingHorizontal: 6,
    position: 'absolute',
  },
  dropDownContainer: {
    marginTop: 20,
    position: 'relative',
  },
  dropDownContainerStyle: {
    height: 50,
    marginTop: 10,
  },
  dropDownPickerStyle: {
    backgroundColor: 'white',
    zIndex: 5000,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 2,
    borderColor: Color.inputBorderLineColor,
  },
});

export default ScorecardPreference;