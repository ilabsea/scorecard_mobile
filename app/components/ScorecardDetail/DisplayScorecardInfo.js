import React, {Component} from 'react';
import {TextInput} from 'react-native-paper';
import {LocalizationContext} from '../../components/Translations';
import { bodyFontSize } from '../../utils/font_size_util';

class DisplayScorecardInfo extends Component {
  static contextType = LocalizationContext;

  getFieldValueByLanguage = (fieldData, appLanguage) => {
    const attrs = JSON.parse(fieldData);
    return appLanguage == 'km' ? attrs.name_km : attrs.name_en;
  }

  render() {
    const {translations, appLanguage} = this.context;
    const {scorecardDetail} = this.props;
    const renderFields = [
      {label: 'year', fieldName: 'year', isObject: false},
      {label: 'facility', fieldName: 'facility', isObject: true},
      {label: 'scorecardType', fieldName: 'program_scorecard_type', isObject: false},
      {label: 'province', fieldName: 'province', isObject: false},
      {label: 'district', fieldName: 'district', isObject: false},
      {label: 'commune', fieldName: 'commune', isObject: false},
      {label: 'facilityName', fieldName: 'dataset', isObject: true},
      {label: 'implementer', fieldName: 'local_ngo_name', isObject: false},
    ];

    return renderFields.map((renderField, index) => {
      let value = scorecardDetail[renderField.fieldName] != undefined ? scorecardDetail[renderField.fieldName].toString() : ''

      if (renderField.label == 'scorecardType')
        value = scorecardDetail.program_scorecard_type ? this.getFieldValueByLanguage(scorecardDetail.program_scorecard_type, appLanguage) : translations[scorecardDetail.scorecard_type];
      else if (!value)
        return;
      else if (renderField.isObject)
        value = this.getFieldValueByLanguage(scorecardDetail[renderField.fieldName], appLanguage);

      return (
        <TextInput
          label={ renderField.label != 'facilityName' ? translations[renderField.label] : this.getFieldValueByLanguage(scorecardDetail.facility, appLanguage)}
          mode="outlined"
          value={value}
          editable={false}
          style={{backgroundColor: 'white', width: '100%', marginTop: 20, fontSize: bodyFontSize()}}
          key={index}
        />
      );
    });
  }
}

export default DisplayScorecardInfo;
