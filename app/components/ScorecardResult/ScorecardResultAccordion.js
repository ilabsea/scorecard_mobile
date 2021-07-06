import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { Icon } from 'native-base';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';
import { LocalizationContext } from '../Translations';

import indicatorHelper from '../../helpers/indicator_helper';
import uuidv4 from '../../utils/uuidv4';
import Color from '../../themes/color';
import { smLabelSize } from '../../constants/mobile_font_size_constant';

class ScorecardResultAccordion extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      accordionStatuses: new Array(props.criterias.length)
    }
  }

  _renderMedian(criteria, fieldName) {
    const {translations} = this.context;
    return (
      <View style={{flexDirection: 'row', marginVertical: 16}}>
        <Text style={styles.itemTitleText}>{translations[fieldName]}</Text>
        <Text style={styles.itemValueText}>{ criteria.median }</Text>
      </View>
    )
  }

  onPress = (criteria, fieldName, indicator, isAddNew) => {
    if (isAddNew && this.props.isScorecardFinished)
      return;

    !!this.props.onPress && this.props.onPress(criteria, fieldName, indicator);
  }

  _renderFieldLabel(criteria, fieldName) {
    const { translations } = this.context;

    if (fieldName == 'suggested_action') {
      const textStyle = { fontSize: wp(smLabelSize), alignSelf: 'center' };

      return (
        <View style={{flexDirection: "row", flexGrow: 1}}>
          <Text style={textStyle}>
            { translations[fieldName] }
          </Text>
          <Text style={[textStyle, this._isRequired(criteria) ? { color: Color.redColor } : {}]}> *</Text>
        </View>
      )
    }

    return <Text style={styles.itemTitleText}>{translations[fieldName]}</Text>
  }

  btnAdd = (criteria, fieldName, indicator) => {
    const { translations } = this.context;

    return (
      <View style={{flexDirection: 'row', marginVertical: 16}}>
        {this._renderFieldLabel(criteria, fieldName)}

        <TouchableOpacity onPress={() => this.onPress(criteria, fieldName, indicator, true)} style={{alignItems: 'center'}}>
          <View style={styles.btn}>
            <Text style={[styles.btnText, this.textColor()]}>{ translations.addText }</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderEditText = (criteria, fieldName, indicator) => {
    const { translations } = this.context;

    return (
      <View style={{flexDirection: 'row', marginVertical: 6}}>
        {this._renderFieldLabel(criteria, fieldName)}
        <View style={{flexDirection: 'row', padding: 6, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.onPress(criteria, fieldName, indicator, false)}
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
    return this.props.isScorecardFinished ? { color: 'gray' } : {};
  }

  _renderClickableItem = (criteria, fieldName, indicator) => {
    if (!criteria[fieldName]) {
      return this.btnAdd(criteria, fieldName, indicator);
    }

    return this.renderEditText(criteria, fieldName, indicator);
  }

  _renderItem(criteria, indicator) {
    const fieldNames = ['score', 'strength', 'weakness', 'suggested_action'];

    return fieldNames.map((fieldName, index) => {
      return (
        <View key={uuidv4()} style={{paddingHorizontal: 20, backgroundColor: '#fbf9ed'}}>
          { index == 0 && this._renderMedian(criteria, fieldName) }
          { index > 0 && this._renderClickableItem(criteria, fieldName, indicator) }
          { index < fieldNames.length - 1 && <Divider style={{backgroundColor: '#b3b3b3'}}/> }
        </View>
      )
    });
  }

  _isRequired(criteria) {
    if (!criteria.suggested_action)
      return true;

    return false;
  }

  _toggleAccordion(index) {
    let statuses = this.state.accordionStatuses;
    statuses[index] = !statuses[index];

    this.setState({
      accordionStatuses: statuses
    })
  }

  renderTitleText(indicatorName, criteria) {
    const textColor = this._isRequired(criteria) ? { color: Color.redColor } : { color: Color.blackColor };

    return (
      <View style={{flexDirection: 'row', width: wp('70%')}}>
        <Text numberOfLines={1} style={styles.titleText}>{ indicatorName }</Text>
        <Text style={[styles.titleText, textColor]}> *</Text>
      </View>
    )
  }

  _renderAccordion() {
    return this.props.criterias.map((criteria, index) => {
      const indicator = indicatorHelper.getDisplayIndicator(criteria);
      let indicatorName = indicator.content || indicator.name;

      return (
        <List.Accordion
          key={uuidv4()}
          title={this.renderTitleText(indicatorName, criteria)}
          style={{ backgroundColor: Color.whiteColor, borderBottomWidth: 1, borderColor: '#ebebeb' }}
          titleStyle={[styles.titleText, this._isRequired(criteria) ? { color: Color.redColor } : { color: Color.blackColor }]}
          onPress={() => this._toggleAccordion(index)}
          expanded={this.state.accordionStatuses[index]}
        >
          { this._renderItem(criteria, indicator) }
        </List.Accordion>
      )
    });
  }



  render() {
    return (
      <View>
        <List.Section style={{marginTop: -10}}>
          { this._renderAccordion() }
        </List.Section>
      </View>
    );
  }
}

export default ScorecardResultAccordion;