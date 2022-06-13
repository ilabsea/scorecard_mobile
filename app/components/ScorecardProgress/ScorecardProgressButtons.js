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
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import Scorecard from '../../models/Scorecard';
import { FINISHED } from '../../constants/milestone_constant';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import { getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';


class ScorecardProgressButtons extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      visibleConfirmModal: false,
      isRefreshable: false,
      isAllowToFinish: false,
    };
  }

  async componentDidMount() {
    this.setState({
      isRefreshable: await Scorecard.isRefreshable(this.props.scorecard),
      isAllowToFinish: await scorecardProgressService.isAllowToFinish(this.props.scorecard)
    });
  }

  finishScorecard() {
    Scorecard.update(this.props.scorecard.uuid, {finished: true, finished_date: new Date(), milestone: FINISHED});
    this.setState({ visibleConfirmModal: false });
    scorecardTracingStepsService.trace(this.props.scorecard.uuid, 9);
    this.props.updateScorecard();
  }

  renderBtnFinish() {
    return (
      <BottomButton
        disabled={!this.state.isAllowToFinish}
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
    const mobileFontSize = getMobileFontSizeByPixelRatio(13.5, 12.5);
    const fontSize = getDeviceStyle(15, mobileFontSize);

    if (this.state.isRefreshable)
      message = `${translations.toBeRemovedOn}: ${ scorecardHelper.getTranslatedRemoveDate(this.props.scorecard.uploaded_date, appLanguage) }`;
    else
      message = translations[this.props.progressMessage]

    return (
      <Text style={{ fontSize: fontSize, color: Color.redColor, textAlign: 'center', fontFamily: FontFamily.title, paddingTop: 5}}>
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