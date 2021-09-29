import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomButton from '../BottomButton';
import ScorecardProgressSubmitButton from './ScorecardProgressSubmitButton';
import ScorecardProgressConfirmFinishContent from './ScorecardProgressConfirmFinishContent';
import MessageModal from '../MessageModal';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import scorecardHelper from '../../helpers/scorecard_helper';
import scorecardProgressService from '../../services/scorecard_progress_service';
import Scorecard from '../../models/Scorecard';
import { FINISHED } from '../../constants/milestone_constant';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';

class ScorecardProgressButtons extends Component {
  static contextType = LocalizationContext;
  state = {
    visibleConfirmModal: false,
  };

  finishScorecard() {
    Scorecard.update(this.props.scorecard.uuid, {finished: true, finished_date: new Date(), milestone: FINISHED});
    this.setState({ visibleConfirmModal: false });
    this.props.updateScorecard();
  }

  renderBtnFinish() {
    return (
      <BottomButton
        disabled={!scorecardProgressService.isAllowToFinish(this.props.scorecard)}
        onPress={() => this.setState({ visibleConfirmModal: true })}
        customBackgroundColor={Color.headerColor}
        iconName={'checkmark'}
        label={this.context.translations.finish}
      />
    )
  }

  renderBtnSubmit() {
    return (
      <ScorecardProgressSubmitButton
        scorecard={this.props.scorecard}
        submitToServer={() => this.props.submitToServer()}
        progressPercentag={this.props.progressPercentag}
        showProgress={this.props.showProgress}
      />
    )
  }

  renderMessage() {
    const { translations, appLanguage } = this.context;
    let message = '';
    if (this.props.scorecard.isUploaded)
      message = `${translations.toBeRemovedOn}: ${ scorecardHelper.getTranslatedRemoveDate(this.props.scorecard.uploaded_date, appLanguage) }`;
    else
      message = translations[scorecardProgressService.getProgressMessage(this.props.criterias, this.props.scorecard)];

    return (
      <Text style={{ fontSize: getDeviceStyle(15, 12), color: Color.redColor, textAlign: 'center', fontFamily: FontFamily.title, paddingTop: 5}}>
        { message }
      </Text>
    )
  }

  renderConfirmModal() {
    return (
      <MessageModal
        visible={this.state.visibleConfirmModal}
        onDismiss={() => this.setState({visibleConfirmModal: false})}
        hasConfirmButton={true}
        confirmButtonLabel={this.context.translations.ok}
        onPressConfirmButton={() => this.finishScorecard()}
        child={() => <ScorecardProgressConfirmFinishContent scorecardUuid={this.props.scorecard.uuid} />}
        renderInline={true}
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        { this.renderMessage() }
        <View style={{padding: containerPadding}}>
          { !this.props.scorecard.finished && this.renderBtnFinish() }

          { this.props.scorecard.finished && this.renderBtnSubmit() }
        </View>
        { this.renderConfirmModal() }
      </React.Fragment>
    )
  }
}

export default ScorecardProgressButtons;