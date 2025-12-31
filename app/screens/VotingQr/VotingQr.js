import React, {useContext, useState} from 'react';
import { Animated, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Color from '../../themes/color';
import { LocalizationContext } from '../../components/Translations';
import CollapsibleNavHeader from '../../components/Share/CollapsibleNavHeader';
import ErrorAlertMessage from '../../components/Share/ErrorAlertMessage';
import BottomButton from '../../components/BottomButton';
import { screenPaddingBottom } from '../../utils/component_util';
import {
  containerPaddingTop,
  bottomButtonContainerPadding
} from '../../utils/responsive_util';
import { headerShrinkOffset } from '../../constants/component_style_constant';
import onlineScorecardSubmissionService from '../../services/online_scorecard_submission_service';
import { ERROR_DRAFT_SUBMIT, ERROR_NOT_FOUND } from '../../constants/error_constant';

const VotingQr = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [visibleModal, setVisibleModal] = useState(false);
  const [errorType, setErrorType] = useState(null);

  const scrollY = new Animated.Value(0)
  var isHeaderShrunk = false

  const _goNext = () => {
    onlineScorecardSubmissionService.draftSubmit({
      scorecardUuid: props.route.params.scorecard_uuid,
      successCallback: () => {
        // Todo: Send API request to download the QR code image
      },
      errorCallback: (errorType) => {
        setErrorType(errorType != ERROR_NOT_FOUND ? errorType : ERROR_DRAFT_SUBMIT);
        setVisibleModal(true);
      }
    });
  }

  const _renderBody = () => {
    return (
      <React.Fragment>
        <CollapsibleNavHeader title={translations.voting} scrollY={scrollY} progressIndex={3} isPassProposeStep={true} tipIconVisible={false} />

        <Animated.View style={{flex: 1, paddingTop: containerPaddingTop, zIndex: -1}}>
          <ScrollView
            onScroll={
              Animated.event([{ nativeEvent: {contentOffset: { y: scrollY }} }],
                { listener: (event) => { isHeaderShrunk = event.nativeEvent.contentOffset.y >= headerShrinkOffset}, useNativeDriver: false}
              )
            }
          >
            <View style={{height: 600, backgroundColor: 'green'}}></View>
            <View style={{height: 500, backgroundColor: 'blue'}}></View>
          </ScrollView>
        </Animated.View>
        <View style={bottomButtonContainerPadding()}>
          <BottomButton
            onPress={() => _goNext()}
            customBackgroundColor={Color.headerColor}
            label={translations.next}
            // disabled={!hasVoting(props.scorecard.uuid)}
          />
        </View>
      </React.Fragment>
    )
  }

  return (
    <View style={{height: '100%', paddingBottom: screenPaddingBottom(props.sdkVersion)}}>
      { _renderBody() }
      <ErrorAlertMessage
        visible={visibleModal}
        errorType={errorType}
        scorecardUuid={props.route.params.scorecard_uuid}
        onDismiss={() => setVisibleModal(false)}
      />
    </View>
  )
}

function mapStateToProps(state) {
  return {
    sdkVersion: state.sdkVersion
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VotingQr);