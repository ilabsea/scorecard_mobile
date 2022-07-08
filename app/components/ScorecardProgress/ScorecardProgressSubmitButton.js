import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';
import { ProgressBar } from 'react-native-paper';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import { isScorecardInReview } from '../../utils/scorecard_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import Scorecard from '../../models/Scorecard';
import ScorecardProgressTabletStyles from '../../styles/tablet/ScorecardProgressScreenStyle';
import ScorecardProgressMobileStyles from '../../styles/mobile/ScorecardProgressScreenStyle';

const responsiveStyles = getDeviceStyle(ScorecardProgressTabletStyles, ScorecardProgressMobileStyles);

class ScorecardProgressSubmitButton extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      hasMatchedEndpointUrl: false,
      isSubmittable: false,
    }
    this.componentIsUnmount = false;
  }

  async componentDidMount() {
    this.setState({
      hasMatchedEndpointUrl: await Scorecard.hasMatchedEndpointUrl(this.props.scorecard.uuid),
      isSubmittable: !this.props.showProgress && await Scorecard.isSubmittable(this.props.scorecard.uuid)
    });
  }

  async componentDidUpdate(prevProps) {
    if (!this.isComponentUnmounted && prevProps.showProgress != this.props.showProgress)
      this.setState({ isSubmittable: !this.props.showProgress && await Scorecard.isSubmittable(this.props.scorecard.uuid) })
  }

  componentWillUnmount() { this.componentIsUnmount = true; }

  renderProgressBar() {
    if (this.props.showProgress) {
      return (
        <View>
          <Text style={responsiveStyles.uploadPercentageLabel}>
            {Math.ceil(this.props.progressPercentag * 100)}%
          </Text>
          <ProgressBar
            progress={this.props.progressPercentag}
            color={Color.headerColor}
            style={responsiveStyles.progressBar}
            visible={ this.props.showProgress }
          />
        </View>
      );
    }
  }

  submitLabel() {
    const { translations } = this.context;

    if (this.props.scorecard.isCompleted || isScorecardInReview(this.props.scorecard))
      return translations.submitted

    return this.state.hasMatchedEndpointUrl ? translations.submit : translations.unableToSubmit;
  }

  renderButton() {
    let btnStyle = { backgroundColor: !this.state.isSubmittable ? Color.disabledBtnBg : Color.headerColor };

    return (
      <TouchableOpacity
        disabled={!this.state.isSubmittable}
        onPress={() => this.props.submitToServer() }
        style={[responsiveStyles.btn, btnStyle]}>

        <Text style={responsiveStyles.btnText}>{ this.submitLabel() }</Text>

        { isScorecardInReview(this.props.scorecard) &&
          <Text style={responsiveStyles.btnSubText}>({ this.context.translations.inReview })</Text>
        }

        { this.props.scorecard.isUploaded &&
          <Icon name={'lock-closed'}  style={responsiveStyles.lockIcon}/>
        }
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <React.Fragment>
        { this.renderProgressBar() }
        { this.renderButton() }
      </React.Fragment>
    )
  }
}

export default ScorecardProgressSubmitButton;