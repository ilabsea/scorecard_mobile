import React, { Component } from 'react';
import { View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {LocalizationContext} from '../Translations';

import SelectBox from './SelectBox';
import participantHelper from '../../helpers/participant_helper';
import uuidv4 from '../../utils/uuidv4'

class AttributesSelectBox extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      isDisability: false,
      isMinority: false,
      isPoor: false,
      isYouth: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.participant) {
      return { 
        isDisability: props.participant.isDisability,
        isMinority: props.participant.isMinority,
        isPoor: props.participant.isPoor,
        isYouth: props.participant.isYouth,
      };
    }
  }

  onPress = (fieldName) => {
    let newState = {};
    newState[fieldName] = !this.state[fieldName];
    this.props.onChangeValue(fieldName, !this.state[fieldName])
    this.setState(newState);
  }

  _renderParticipantAttributes = () => {
    const { translations } = this.context;
    const attributes = participantHelper.getAttributes(this.state, translations);

    let doms = [];

    for (let key in attributes) {
      doms.push(
        <View key={uuidv4()} style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
          {
            attributes[key].map((attribute) => {
              if (attribute == null)
                return (<View style={{flex: 1}} />)

              return (
                <View key={uuidv4()} style={{ marginBottom: 10, flex: 1, alignItems: 'center' }}>
                  { this._renderSelectBox(attribute) }
                </View>
              )
            })
          }
        </View>
      )
    }

    return doms;
  }

  isSelected = (fieldName) => {
    return this.state.isDisability;
  }

  _renderSelectBox = (attribute) => {
    const iconsize = this.props.renderSmallSize ? 22 : 45;
    const isSelected = this.state[attribute.fieldName];

    return (
      <SelectBox
        onPress={() => this.onPress(attribute.fieldName)}
        value={isSelected}
        label={ attribute.title }
        isSelected={isSelected}
        renderSmallSize={this.props.renderSmallSize}
        borderColor={participantHelper.getItemColor(isSelected, '#ebebeb')}
        textColor={participantHelper.getItemColor(isSelected, 'gray')}
      >
        <FontAwesomeIcon name={attribute.iconName} size={iconsize} style={{paddingHorizontal: 10}}
          color={participantHelper.getItemColor(isSelected, 'gray')}
        />
      </SelectBox>
    );
  }

  render() {
    return this._renderParticipantAttributes();
  }
}

export default AttributesSelectBox;