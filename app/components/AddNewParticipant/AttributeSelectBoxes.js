import React from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import OptionsSelectBox from './OptionsSelectBox';
import SelectBoxTitle from './SelectBoxTitle';
import uuidv4 from '../../utils/uuidv4';
import { bodyFontSize } from '../../utils/font_size_util';

class AttributeSelectBoxes extends React.Component {
  static contextType = LocalizationContext;
  renderSelectBox(attributes, key) {
    return (
      <View key={uuidv4()} style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
        {
          attributes[key].map((attribute) => {
            if (attribute == null)
              return (<View key={uuidv4()} style={{flex: 1}} />)

            return (
              <View key={uuidv4()} style={{ marginBottom: 10, flex: 1, alignItems: 'center' }}>
                <OptionsSelectBox
                  title={attribute.title}
                  iconName={attribute.iconName}
                  fieldName={attribute.fieldName}
                  onChangeValue={this.props.onChange}
                  isSelected={attribute.isSelected}
                  renderSmallSize={this.props.renderSmallSize}
                  disabled={this.props.disabled}
                />
              </View>
            )
          })
        }
      </View>
    )
  }

  renderSelectBoxes() {
    const { translations } = this.context;
    const attributes = {
      firstRow: [
        { iconName: 'wheelchair', fieldName: 'isDisability', isSelected: this.props.isDisability, title: translations.disability },
        { iconName: 'users', fieldName: 'isMinority', isSelected: this.props.isMinority, title: translations.minority },
        { iconName: 'id-card-o', fieldName: 'isPoor', isSelected: this.props.isPoor, title: translations.poor },
      ]
    }

    let doms = [];
    for (let key in attributes) {
      doms.push(this.renderSelectBox(attributes, key))
    }
    return doms;
  }

  render() {
    return (
      <React.Fragment>
        <SelectBoxTitle label={this.context.translations.attributes} disabled={this.props.disabled} labelStyle={{marginTop: 15}} />
        { this.renderSelectBoxes() }
      </React.Fragment>
    )
  }
}

export default AttributeSelectBoxes;