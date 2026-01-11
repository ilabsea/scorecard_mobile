import React, {useContext, useEffect, useState} from 'react';
import { Animated, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';

import Color from '../../themes/color';
import { LocalizationContext } from '../../components/Translations';
import CollapsibleNavHeader from '../../components/Share/CollapsibleNavHeader';
import ErrorAlertMessage from '../../components/Share/ErrorAlertMessage';
import BottomButton from '../../components/BottomButton';
import EmptyListAction from '../../components/Share/EmptyListAction';
import VotingQrCode from '../../components/VotingQr/VotingQrCode';
import { screenPaddingBottom } from '../../utils/component_util';
import {
  bottomButtonContainerPadding,
  passProposeStepContainerPaddingTopInput,
  passProposeStepContainerPaddingTopOutput,
  getDeviceStyle
} from '../../utils/responsive_util';
import Scorecard from '../../models/Scorecard';
import scorecardProgressService from '../../services/scorecard_progress_service';
import onlineScorecardSubmissionService from '../../services/online_scorecard_submission_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import internetConnectionService from '../../services/internet_connection_service';
import { ERROR_DOWNLOAD_VOTING_QR, ERROR_OPEN_VOTING, ERROR_CLOSE_VOTING } from '../../constants/error_constant';
import { headerShrinkOffset } from '../../constants/component_style_constant';
import { navigationRef } from '../../navigators/app_navigator';

const VotingQr = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isOpenVoting, setIsOpenVoting] = useState(false);
  const [votingObj, setVotingObj] = useState({ qr_code: null, url: null });
  const [errorType, setErrorType] = useState(null);
  const [isFinishVoting, setIsFinishVoting] = useState(false);
  const [hasInternetConnection, setHasInternetConnection] = useState(false);
  var unsubscribeNetInfo;

  const scrollY = new Animated.Value(0)
  var isHeaderShrunk = false

  useEffect(() => {
    unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      setHasInternetConnection(hasConnection);
    });

    const scorecard = Scorecard.find(props.route.params.scorecard_uuid);
    setIsOpenVoting(scorecard.is_open_voting);
    setIsFinishVoting(!scorecard.is_open_voting && !!scorecard.voting_url);

    if (!scorecard.is_open_voting && !scorecard.voting_url)
      openVoting();
    else
      loadVotingQr();

    return () => {
      unsubscribeNetInfo && unsubscribeNetInfo();
    };
  }, []);

  const openVoting = () => {
    if (!hasInternetConnection) {
      internetConnectionService.showAlertMessage(translations.noInternetConnection);
      return;
    }

    setIsLoading(true);
    scorecardProgressService.setOpenCloseVoting({
      scorecardUuid: props.route.params.scorecard_uuid,
      isOpen: true,
      successCallback: () => {
        Scorecard.update(props.route.params.scorecard_uuid, { is_open_voting: true });
        setIsOpenVoting(true);
        downloadQrCode();
      },
      errroCallback: (error) => {
        setIsLoading(false);
        setErrorType(ERROR_OPEN_VOTING);
        setVisibleModal(true);
      }
    });
  }

  const loadVotingQr = () => {
    const scorecard = Scorecard.find(props.route.params.scorecard_uuid)
    setVotingObj({
      qr_code: scorecard.voting_qr,
      url: scorecard.voting_url
    });
  }

  const downloadQrCode = async () => {
    if (!hasInternetConnection) {
      internetConnectionService.showAlertMessage(translations.noInternetConnection);
      return;
    }

    onlineScorecardSubmissionService.downloadVotingQrCode({
      scorecardUuid: props.route.params.scorecard_uuid,
      successCallback: (response) => {
        setVotingObj({
          qr_code: response.qr_code,
          url: response.voting_url
        });
        setIsLoading(false);
      },
      errorCallback: (error) => {
        setIsLoading(false);
        setErrorType(ERROR_DOWNLOAD_VOTING_QR);
        setVisibleModal(true);
      }
    })
  }

  const closeVoting = () => {
    if (!hasInternetConnection) {
      internetConnectionService.showAlertMessage(translations.noInternetConnection);
      return;
    }

    setIsLoading(true);
    scorecardProgressService.setOpenCloseVoting({
      scorecardUuid: props.route.params.scorecard_uuid,
      isOpen: false,
      successCallback: () => {
        Scorecard.update(props.route.params.scorecard_uuid, { is_open_voting: false });
        setIsFinishVoting(true);
        setIsOpenVoting(false);
        setIsLoading(false);
        scorecardTracingStepsService.trace(props.route.params.scorecard_uuid, 7);
        goToNextScreen();
      },
      errroCallback: (error) => {
        setIsLoading(false);
        setErrorType(ERROR_CLOSE_VOTING);
        setVisibleModal(true);
      }
    });
  }

  const goToNextScreen = () => {
    navigationRef.current?.navigate('OfflineScorecardResult', {scorecard_uuid: props.route.params.scorecard_uuid})
  }

  const openVotingButton = () => {
    return (
      <View style={{height: '100%', paddingTop: hp('2%')}}>
        <EmptyListAction
          title={translations.pleaseOpenVoting}
          buttonLabel={translations.openVoting}
          onPress={() => openVoting()}
          customContainerStyle={{ marginTop: getDeviceStyle(wp('30%'), wp('45%')) }}
        />
      </View>
    )
  }

  const closeVotingMessage = () => {
    return (
      <View style={{height: '100%', paddingTop: hp('2%')}}>
        <EmptyListAction
          title={translations.votingHasClosed}
          placeholderIcon='checkmark-done-circle-outline'
          hideButton={true}
          customContainerStyle={{ marginTop: getDeviceStyle(wp('30%'), wp('45%')) }}
        />
      </View>
    )
  }

  const downloadQrCodeButton = () => {
    return (
      <View style={{height: '100%', paddingTop: hp('2%')}}>
        <EmptyListAction
          title={translations.pleaseDownloadVotingQrCodeAndVotingUrl}
          buttonLabel={translations.donwload}
          placeholderIcon='qr-code-outline'
          isMaterialIconButton={true}
          icon='download'
          onPress={() => downloadQrCode()}
          customContainerStyle={{ marginTop: getDeviceStyle(wp('30%'), wp('45%')) }}
        />
      </View>
    ) 
  }

  const unvotedComponents = () => {
    if (isLoading)
      return <View/>

    return (
      <React.Fragment>
        { (!isOpenVoting && !votingObj.qr_code) && openVotingButton() }

        { (isOpenVoting && !votingObj.qr_code) && downloadQrCodeButton() }

        { (isOpenVoting&& !!votingObj.qr_code) &&
          <VotingQrCode
            votingObj={votingObj}
            showErrorModal={(type) => {
              setErrorType(type);
              setVisibleModal(true);
            }}
          />
        }
      </React.Fragment>
    )
  }

  const isActionButtonDisabled = () => {
    if (isFinishVoting)
      return false;

    return !isOpenVoting || isLoading
  }

  const _renderBody = () => {
    const containerPaddingTop = scrollY.interpolate({
      inputRange: passProposeStepContainerPaddingTopInput,
      outputRange: passProposeStepContainerPaddingTopOutput,
      extrapolate: 'clamp',
    })

    return (
      <React.Fragment>
        <CollapsibleNavHeader title={translations.voting} scrollY={scrollY} progressIndex={3} isPassProposeStep={true} tipIconVisible={false} />

        <Spinner
          visible={isLoading}
          color={Color.primaryColor}
          overlayColor={Color.loadingBackgroundColor}
        />

        <Animated.View style={{flex: 1, paddingTop: containerPaddingTop, zIndex: -1}}>
          <ScrollView
            onScroll={
              Animated.event([{ nativeEvent: {contentOffset: { y: scrollY }} }],
                { listener: (event) => { isHeaderShrunk = event.nativeEvent.contentOffset.y >= headerShrinkOffset}, useNativeDriver: false}
              )
            }
          >
            { isFinishVoting
              ? closeVotingMessage()
              : unvotedComponents()
            }
          </ScrollView>
        </Animated.View>
        <View style={bottomButtonContainerPadding()}>
          <BottomButton
            onPress={() => isFinishVoting ? goToNextScreen() : closeVoting()}
            customBackgroundColor={Color.headerColor}
            label={isFinishVoting ? translations.next : translations.closeVoting}
            disabled={isActionButtonDisabled()}
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