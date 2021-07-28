import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { Icon } from 'native-base';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';
import { LocalizationContext } from '../Translations';
import Accordion from '../Accordion';

import indicatorHelper from '../../helpers/indicator_helper';
import uuidv4 from '../../utils/uuidv4';
import Color from '../../themes/color';
import { smLabelSize } from '../../constants/mobile_font_size_constant';

let _this = null;

class ScorecardResultAccordion extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    _this = this;
  }

  _renderMedian(criteria, fieldName) {
    const {translations} = _this.context;
    return (
      <View style={{flexDirection: 'row', marginVertical: 16}}>
        <Text style={styles.itemTitleText}>{translations[fieldName]}</Text>
        <Text style={styles.itemValueText}>{ criteria.median }</Text>
      </View>
    )
  }

  onPress = (criteria, fieldName, indicator, isAddNew) => {
    if (isAddNew && _this.props.isScorecardFinished)
      return;

    !!_this.props.onPress && _this.props.onPress(criteria, fieldName, indicator);
  }

  _renderFieldLabel(criteria, fieldName) {
    const { translations } = _this.context;

    if (fieldName == 'suggested_action') {
      const textStyle = { fontSize: wp(smLabelSize), alignSelf: 'center' };

      return (
        <View style={{flexDirection: "row", flexGrow: 1}}>
          <Text style={textStyle}>
            { translations[fieldName] }
          </Text>
          <Text style={[textStyle, _this._isRequired(criteria) ? { color: Color.redColor } : {}]}> *</Text>
        </View>
      )
    }

    return <Text style={styles.itemTitleText}>{translations[fieldName]}</Text>
  }

  btnAdd = (criteria, fieldName, indicator) => {
    const { translations } = _this.context;

    return (
      <View style={{flexDirection: 'row', marginVertical: 16}}>
        {_this._renderFieldLabel(criteria, fieldName)}

        <TouchableOpacity onPress={() => _this.onPress(criteria, fieldName, indicator, true)} style={{alignItems: 'center'}}>
          <View style={styles.btn}>
            <Text style={[styles.btnText, _this.textColor()]}>{ translations.addText }</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderEditText = (criteria, fieldName, indicator) => {
    return (
      <View style={{flexDirection: 'row', marginVertical: 6}}>
        {_this._renderFieldLabel(criteria, fieldName)}
        <View style={{flexDirection: 'row', padding: 6, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => _this.onPress(criteria, fieldName, indicator, false)}
            style={styles.btnEdit}
          >
            <Text style={styles.btnEditText}>{JSON.parse(criteria[fieldName]).length}</Text>
            <Icon name={'pen'} type="FontAwesome5" style={styles.btnEditIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  textColor = () => {
    return _this.props.isScorecardFinished ? { color: 'gray' } : {};
  }

  _renderClickableItem = (criteria, fieldName, indicator) => {
    if (!criteria[fieldName]) {
      return _this.btnAdd(criteria, fieldName, indicator);
    }

    return _this.renderEditText(criteria, fieldName, indicator);
  }

  renderAccordionContent(criteria) {
    const fieldNames = ['score', 'strength', 'weakness', 'suggested_action'];
    const indicator = indicatorHelper.getDisplayIndicator(criteria);

    return fieldNames.map((fieldName, index) => {
      return (
        <View key={uuidv4()} style={{paddingHorizontal: 20, backgroundColor: Color.accordionContentBgColor}}>
          { index == 0 && _this._renderMedian(criteria, fieldName) }
          { index > 0 && _this._renderClickableItem(criteria, fieldName, indicator) }
          { index < fieldNames.length - 1 && <Divider style={{backgroundColor: '#b3b3b3'}}/> }
        </View>
      )
    });
  }

  _isRequired(criteria) {
    return !criteria.suggested_action ? true : false;
  }

  renderTitleText(criteria) {
    const indicator = indicatorHelper.getDisplayIndicator(criteria);
    const indicatorName = indicator.content || indicator.name;
    const textColor = _this._isRequired(criteria) ? { color: Color.redColor } : { color: Color.blackColor };

    return (
      <View style={{flexDirection: 'row', width: wp('70%')}}>
        <Text numberOfLines={1} style={styles.titleText}>{ indicatorName }</Text>
        <Text style={[styles.titleText, textColor]}> *</Text>
      </View>
    )
  }

  render() {
    return (
      <Accordion
        items={this.props.criterias}
        accordionTitle={this.renderTitleText}
        accordionContent={this.renderAccordionContent}
      />
    );
  }
}

export default ScorecardResultAccordion;