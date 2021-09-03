import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import BottomButton from '../BottomButton';
import ScorecardProgressSubmitButton from './ScorecardProgressSubmitButton';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import scorecardHelper from '../../helpers/scorecard_helper';
import scorecardProgressService from '../../services/scorecard_progress_service';
import Scorecard from '../../models/Scorecard';
import { FINISHED } from '../../constants/milestone_constant';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';

class ScorecardProgressButtons extends Component {
  static contextType = LocalizationContext;

  finishScorecard() {
    Scorecard.update(this.props.scorecard.uuid, {finished: true, finished_date: new Date(), milestone: FINISHED});
    this.props.updateScorecard();
  }

  renderBtnFinish() {
    return (
      <BottomButton
        disabled={!scorecardProgressService.isAllowToFinish(this.props.scorecard)}
        onPress={() => this.finishScorecard()}
        customBackgroundColor={Color.headerColor}
        iconName={'checkmark'}
        label={this.context.translations.finish}
      />
    )
  }

  renderMessage() {
    console.log('criterias == ', this.props.criterias)

    const { translations, appLanguage } = this.context;
    let message = '';
    if (this.props.scorecard.isUploaded)
      message = `${translations.toBeRemovedOn}: ${ scorecardHelper.getTranslatedRemoveDate(this.props.scorecard.uploaded_date, appLanguage) }`;
    else
      message = translations[scorecardProgressService.getProgressMessage(this.props.criterias, this.props.scorecard)];

    return (
      <Text style={{ fontSize: getDeviceStyle(14, 12), color: Color.redColor, textAlign: 'center', fontFamily: FontFamily.title}}>
        { message }
      </Text>
    )
  }

  render() {
    return (
      <React.Fragment>
        { this.renderMessage() }

        <View style={{padding: containerPadding}}>
          { !this.props.scorecard.finished && this.renderBtnFinish() }

          { this.props.scorecard.finished &&
            <ScorecardProgressSubmitButton
              scorecard={this.props.scorecard}
              submitToServer={() => this.props.submitToServer()}
              progressPercentag={this.props.progressPercentag}
              showProgress={this.props.showProgress}
            />
          }
        </View>
      </React.Fragment>
    )
  }
}

export default ScorecardProgressButtons;