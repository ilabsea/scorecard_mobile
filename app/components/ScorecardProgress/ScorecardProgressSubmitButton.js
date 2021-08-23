import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';
import { ProgressBar } from 'react-native-paper';

import { LocalizationContext } from '../../components/Translations';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import scorecardHelper from '../../helpers/scorecard_helper';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import ScorecardProgressTabletStyles from '../../styles/tablet/ScorecardProgressScreenStyle';
import ScorecardProgressMobileStyles from '../../styles/mobile/ScorecardProgressScreenStyle';

const responsiveStyles = getDeviceStyle(ScorecardProgressTabletStyles, ScorecardProgressMobileStyles);

class ScorecardProgressSubmitButton extends Component {
  static contextType = LocalizationContext;

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

  _isButtonDisable = () => {
    if (this.props.showProgress || this.props.scorecard.isUploaded || !this.props.scorecard.finished)
      return true;

    return false;
  }

  renderBtnSubmit() {
    const { translations } = this.context;
    let isDisable = this._isButtonDisable();
    let btnStyle = { backgroundColor: isDisable ? Color.disabledBtnBg : Color.headerColor };

    return (
      <TouchableOpacity
        disabled={isDisable}
        onPress={() => this.props.submitToServer() }
        style={[responsiveStyles.btn, btnStyle]}>

        <Text style={responsiveStyles.btnText}>{translations['submit']}</Text>
        { this.props.scorecard.isUploaded &&
          <Icon name={'lock-closed'}  style={responsiveStyles.lockIcon}/>
        }
      </TouchableOpacity>
    )
  }

  render() {
    const { translations, appLanguage } = this.context

    return (
      <React.Fragment>
        { this.props.scorecard.isUploaded &&
          <Text style={{ fontSize: getDeviceStyle(14, 12), color: Color.redColor, textAlign: 'center', fontFamily: FontFamily.title}}>
            {translations.toBeRemovedOn}: { scorecardHelper.getTranslatedRemoveDate(this.props.scorecard.uploaded_date, appLanguage) }
          </Text>
        }

        <View style={{padding: containerPadding}}>
          { this.renderProgressBar() }
          { this.renderBtnSubmit() }
        </View>
      </React.Fragment>
    )
  }
}

export default ScorecardProgressSubmitButton;