import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomButton from '../BottomButton';
import ScorecardProgressSubmitButton from './ScorecardProgressSubmitButton';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import BoldLabel from '../Share/BoldLabel';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import scorecardHelper from '../../helpers/scorecard_helper';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import Scorecard from '../../models/Scorecard';
import { FINISHED } from '../../constants/scorecard_constant';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import { getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';


class ScorecardProgressButtons extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      visibleConfirmModal: false,
      isFinishable: false,
    };
  }

  async componentDidMount() {
    this.setState({ isFinishable: await Scorecard.isFinishable(this.props.scorecard) });
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
        disabled={!this.state.isFinishable}
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

    if (this.props.scorecard.isUploaded)
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
    const { translations } = this.context;
    const scorecardCode = <BoldLabel label={this.props.scorecard.uuid} />

    return <CustomAlertMessage
              visible={this.state.visibleConfirmModal}
              title={translations.finishTheScorecard}
              description={translations.formatString(translations.thisScorecardWillBeLocked, scorecardCode)}
              descriptionBottomSection={translations.formatString(translations.areYouSureYouWantToFinish, scorecardCode)}
              closeButtonLabel={translations.close}
              hasConfirmButton={true}
              confirmButtonLabel={translations.ok}
              isConfirmButtonDisabled={false}
              onDismiss={() => this.setState({visibleConfirmModal: false})}
              onConfirm={() => this.finishScorecard()}
           />
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