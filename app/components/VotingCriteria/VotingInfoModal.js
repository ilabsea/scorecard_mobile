import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LocalizationContext } from '../Translations';
import BottomSheetModal from '../BottomSheetModal';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

class VotingInfoModal extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      bodyContentFirstPart: null,
      bodyContentSecondPart: null,
      snapPoints: props.snapPoints
    }
  }

  setBodyContent(firstContent, secondContent) {
    this.setState({
      bodyContentFirstPart: firstContent,
      bodyContentSecondPart: secondContent,
    });
  }

  setSnapPoints(snapPoints) {
    this.setState({ snapPoints });
  }

  expandModal() {
    this.setState({ isExpanded: true });
    setTimeout(() => {
      this.props.votingInfoModalRef.current?.expand();
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

  onChangeModal(index) {
    setTimeout(() => {
      this.setState({ isExpanded: index > 0 });
    }, 50);
  }

  renderContent() {
    return (
      <React.Fragment>
        { this.state.bodyContentFirstPart }

        { (!!this.state.bodyContentSecondPart && !this.state.isExpanded) &&
          this.renderExpandButton()
        }

        { !!this.state.bodyContentSecondPart && this.state.bodyContentSecondPart }
      </React.Fragment>
    )
  }

  render() {
    return (
      <BottomSheetModal
        ref={this.props.votingInfoModalRef}
        content={this.renderContent()}
        snapPoints={this.state.snapPoints}
        onDismiss={() => this.setState({ isExpanded: false })}
        onChange={(index) => this.onChangeModal(index)}
      />
    )
  }
}

export default VotingInfoModal;