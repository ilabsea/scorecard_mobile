import React, {Component} from 'react';
import { View, Text, ScrollView } from 'react-native';

import { LocalizationContext } from '../Translations';
import TipListItem from './TipListItem';
import BottomSheetModal from '../BottomSheetModal';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import ModalViewMoreButton from '../ModalViewMoreButton';
import styles from '../../themes/modalStyle';

import { getTipByScreenName } from '../../helpers/tip_helper';
import { bodyFontSize } from '../../utils/font_size_util';
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
      tip: getTipByScreenName(props.screenName),
    }
  }

  renderTips() {
    let doms = this.state.tip.tips.map((tip, index) => {
      if (index == 3 ) {
        return (
          <React.Fragment key={index}>
            { !this.state.isExpanded &&
              <ModalViewMoreButton modalRef={this.props.tipModalRef}
                updateIsExpanded={() => this.setState({ isExpanded: true })}
              />
            }

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

  renderContent() {
    return (
      <React.Fragment>
        <ScrollView style={{flex: 1}}>
          <BottomSheetModalTitle
            title={`${this.context.translations.tips} - ${this.context.translations[this.state.tip.mainTitle]}`}
            dashedLineStyle={{ marginBottom: 8 }}
          />

          <View style={{paddingHorizontal: containerPadding}}>
            <Text style={[styles.title, responsiveStyles.headerTitle, { marginBottom: 10, marginTop: 10, fontSize: bodyFontSize() }]}>{ this.state.tip.title }</Text>

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