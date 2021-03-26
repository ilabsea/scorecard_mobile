import React, {Component} from 'react';
import {TextInput} from 'react-native-paper';
import {LocalizationContext} from '../../components/Translations';
import { normalLabelSize } from '../../utils/responsive_util';

class DisplayScorecardInfo extends Component {
  static contextType = LocalizationContext;
  render() {
    const {translations, appLanguage} = this.context;
    const {scorecardDetail} = this.props;
    const renderFields = [
      {label: 'year', fieldName: 'year'},
      {label: 'unitType', fieldName: 'unit_type'},
      {label: 'scorecardType', fieldName: 'scorecard_type'},
      {label: 'province', fieldName: 'province'},
      {label: 'district', fieldName: 'district'},
      {label: 'commune', fieldName: 'commune'},
      {label: 'implementer', fieldName: 'local_ngo_name'},
    ];

    if (scorecardDetail.primary_school != null) {
      const primarySchool = { label: 'primarySchool', fieldName: 'primary_school' };
      renderFields.splice(6, 0, primarySchool);
    }

    return renderFields.map((renderField, index) => {
      let value = scorecardDetail[renderField.fieldName] != undefined ? scorecardDetail[renderField.fieldName].toString() : ''

      if (renderField.label == 'scorecardType') {
        value = translations[scorecardDetail[renderField.fieldName]]
      }

      if (renderField.label == 'primarySchool') {
        const primarySchool = JSON.parse(scorecardDetail.primary_school);
        value = appLanguage == 'km' ? primarySchool.name_km : primarySchool.name_en;
      }

      return (
        <TextInput
          label={translations[renderField.label]}
          mode="outlined"
          value={value}
          editable={false}
          style={{backgroundColor: 'white', width: '100%', marginTop: 20, fontSize: normalLabelSize}}
          key={index}
        />
      );
    });
  }
}

export default DisplayScorecardInfo;
