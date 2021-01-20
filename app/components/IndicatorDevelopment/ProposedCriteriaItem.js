import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import { Icon } from 'native-base';
import { Button } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { getDisplayIndicator } from '../../services/indicator_service';
import itemStyles from '../../themes/scorecardListItemStyle';
import PlaySound from '../VotingCriteria/PlaySound';
import Color from '../../themes/color';
import CustomStyle from '../../themes/customStyle';
import scorecardService from '../../services/scorecardService';

class ProposedCriteriaItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard = scorecardService.find(props.criteria.scorecard_uuid);

    this.state = {
      indicator: getDisplayIndicator(props.criteria, scorecard),
      active: false
    };
  }

  renderShortcutLabel() {
    let activeStyle = this.state.active ? { backgroundColor: Color.headerColor } : {};
    const { indicator } = this.state;

    return (
      <View style={[itemStyles.statusIconWrapper, styles.statusIconWrapper, activeStyle]}>
        { !!indicator.local_image &&
          <Image source={{uri: `file://${indicator.local_image}`}} style={{width: 120, height: 120}} resizeMode={'contain'} />
        }
      </View>
    )
  }

  handleSelected() {
    let state = !this.state.active;
    let action = state ? 'add' : 'remove';

    if (action == 'add' && this.props.selectedAmount >= this.props.maximumCriteriaAmount) {
      return;
    }

    this.setState({active: state});
    !!this.props.onPress && this.props.onPress(this.props.criteria, action);
  }

  render() {
    const { translations } = this.context;
    const getBorderColor = this.state.active ? Color.headerColor : '#ccc';

    return (
      <TouchableOpacity
        onPress={ () => this.handleSelected() }
        style={[itemStyles.listItem, { borderWidth: 1, borderColor: getBorderColor}]}>

        { this.renderShortcutLabel() }

        <View style={[itemStyles.contentWrapper, {flexDirection: 'row'}]}>
          <View style={{flex: 1}}>
            <Text style={itemStyles.title} numberOfLines={1}>{this.state.indicator.content}</Text>
            <Text style={itemStyles.subText}>{translations.raisedTimes}: ({this.props.criteria.count})</Text>
          </View>

          <View style={{paddingRight: 16, paddingBottom: 16, justifyContent: 'flex-end'}}>
            <PlaySound filePath={this.state.indicator.local_audio}/>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

ProposedCriteriaItem.defaultProps = {
  criteria: { tag: 'Dumi', count: 1 },
  onPress: {}
};

export default ProposedCriteriaItem;

const styles = StyleSheet.create({
  statusIconWrapper: {
    backgroundColor: '#d0cdcd',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    height: 120,
  },
})
