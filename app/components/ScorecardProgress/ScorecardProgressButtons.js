import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomButton from '../BottomButton';
import ScorecardProgressSubmitButton from './ScorecardProgressSubmitButton';
import BoldLabel from '../Share/BoldLabel';
import ConfirmationBottomSheetContent from '../Share/ConfirmationBottomSheetContent';
import DynamicHeightBottomSheetModal from '../DynamicHeightBottomSheetModal';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import scorecardHelper from '../../helpers/scorecard_helper';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import Scorecard from '../../models/Scorecard';
import { FINISHED } from '../../constants/scorecard_constant';
import { bottomButtonContainerPadding } from '../../utils/responsive_util';
import { bottomMessageFontSize } from '../../utils/font_size_util';


class ScorecardProgressButtons extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      isFinishable: false,
    };
    this.confirmationModalRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ isFinishable: await Scorecard.isFinishable(this.props.scorecard) });
  }

  finishScorecard() {
    Scorecard.update(this.props.scorecard.uuid, {finished: true, finished_date: new Date(), milestone: FINISHED});
    scorecardTracingStepsService.trace(this.props.scorecard.uuid, 9);
    this.props.updateScorecard();
  }

  renderBtnFinish() {
    return (
      <BottomButton
        disabled={!this.state.isFinishable}
        onPress={() => this.showConfirmBottomSheet()}
        customBackgroundColor={Color.headerColor}
        iconName={'checkmark'}
        label={this.context.translations.finish}
      />
    )
  }

  showConfirmBottomSheet() {
    const { translations } = this.context;
    const scorecardCode = <BoldLabel label={this.props.scorecard.uuid} />

    this.confirmationModalRef.current?.setContent(
      <ConfirmationBottomSheetContent
        title={translations.finishTheScorecard}
        confirmationMessage={translations.formatString(translations.thisScorecardWillBeLocked, scorecardCode)}
        notice={translations.formatString(translations.areYouSureYouWantToFinish, scorecardCode)}
        contentAlign='start'
        onPress={() => {
          this.confirmationModalRef.current?.dismiss();
          this.finishScorecard()
        }}
      />
    );
    this.confirmationModalRef.current?.present();
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
      message = translations[this.props.progressMessage]

    return (
      <Text style={{ fontSize: bottomMessageFontSize(), color: Color.redColor, textAlign: 'center', fontFamily: FontFamily.title, paddingTop: 5}}>
        { message }
      </Text>
    )
  }

  render() {
    return (
      <React.Fragment>
        { this.renderMessage() }
        <View style={bottomButtonContainerPadding()}>
          { !this.props.scorecard.finished && this.renderBtnFinish() }

          { this.props.scorecard.finished && this.renderBtnSubmit() }
        </View>
        <DynamicHeightBottomSheetModal
          ref={this.confirmationModalRef}
        />
      </React.Fragment>
    )
  }
}

export default ScorecardProgressButtons;