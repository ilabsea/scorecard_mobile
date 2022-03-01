import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LocalizationContext } from '../Translations';
import TipListItem from './TipListItem';
import BottomSheetModal from '../BottomSheetModal';
import DashedLine from '../DashedLine';
import styles from '../../themes/modalStyle';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import tips from '../../db/jsons/tips';

import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';
const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

export default class TipModal extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      tip: tips.filter(t => t.screenName == props.screenName)[0] || tips[0],
    }
  }

  renderTips() {
    let doms = this.state.tip.tips.map((tip, index) => {
      if (index == 3 ) {
        return (
          <React.Fragment key={index}>
            { !this.state.isExpanded && this.renderExpandButton() }

            <TipListItem
              title={tip.title}
              subTitle={tip.subTitle}
              number={index + 1} />
          </React.Fragment>
        )
      }
      else
        return <TipListItem
                key={index}
                title={tip.title}
                subTitle={tip.subTitle}
                number={index + 1} />
    })

    return doms;
  }

  expandModal() {
    this.setState({ isExpanded: true });
    setTimeout(() => {
      this.props.tipModalRef.current?.expand();
    }, 100);
  }

  renderExpandButton() {
    return (
      <TouchableOpacity onPress={() => this.expandModal()} style={{marginBottom: 20, marginTop: -15, alignSelf: 'flex-end', flexDirection: 'row'}}>
        <Text style={{color: Color.clickableColor, fontFamily: FontFamily.title, fontSize: 16, textTransform: 'capitalize'}}>
          {this.context.translations.viewMore}
          </Text>
        <Icon name="expand-more" color={Color.clickableColor} size={26} />
      </TouchableOpacity>
    )
  }

  renderContent() {
    return (
      <React.Fragment>
        <ScrollView style={{flex: 1}}>
          <Text style={[styles.title, responsiveStyles.headerTitle, { padding: containerPadding }]}>{ this.state.tip.title }</Text>

          <DashedLine containerStyle={{marginBottom: 8}} />

          <View style={{padding: containerPadding}}>
            { this.renderTips() }
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  onChangeModal(index) {
    setTimeout(() => {
      this.setState({ isExpanded: index > 0 });
    }, 50);
  }

  render() {
    return (
      <BottomSheetModal
        ref={this.props.tipModalRef}
        content={this.renderContent()}
        snapPoints={this.props.snapPoints}
        onDismiss={() => this.setState({ isExpanded: false })}
        onChange={(index) => this.onChangeModal(index)}
      />
    )
  }
}