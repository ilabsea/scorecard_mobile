import React, {useContext, useEffect, useState, useRef} from 'react';
import { Animated, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';

import Color from '../../themes/color';
import { LocalizationContext } from '../../components/Translations';
import CollapsibleNavHeader from '../../components/Share/CollapsibleNavHeader';
import ErrorAlertMessage from '../../components/Share/ErrorAlertMessage';
import BottomButton from '../../components/BottomButton';
import EmptyListAction from '../../components/Share/EmptyListAction';
import VotingQrCode from '../../components/VotingQr/VotingQrCode';
import VotingResult from '../../components/VotingQr/VotingResult';
import VotingInfoModal from '../../components/VotingIndicator/VotingInfoModal';
import DynamicHeightBottomSheetModal from '../../components/DynamicHeightBottomSheetModal';
import ConfirmationBottomSheetContent from '../../components/Share/ConfirmationBottomSheetContent';
import { screenPaddingBottom } from '../../utils/component_util';
import {
  bottomButtonContainerPadding,
  passProposeStepContainerPaddingTopInput,
  passProposeStepContainerPaddingTopOutput,
  getDeviceStyle
} from '../../utils/responsive_util';
import Scorecard from '../../models/Scorecard';
import VotingIndicator from '../../models/VotingIndicator';
import scorecardProgressService from '../../services/scorecard_progress_service';
import onlineScorecardSubmissionService from '../../services/online_scorecard_submission_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import internetConnectionService from '../../services/internet_connection_service';
import votingResultService from '../../services/voting_result_service';
import { ERROR_DOWNLOAD_VOTING_QR, ERROR_OPEN_VOTING, ERROR_CLOSE_VOTING, ERROR_FETCH_VOTING_RESULT } from '../../constants/error_constant';
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
  const [votingIndicators, setVotingIndicators] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  const votingInfoModalRef = useRef();
  const infoModalRef = useRef();
  const scrollY = new Animated.Value(0)
  var isHeaderShrunk = false
  const confirmationModalRef = React.createRef();

  useEffect(() => {
    const scorecard = Scorecard.find(props.route.params.scorecard_uuid);
    setIsOpenVoting(scorecard.is_open_voting);
    if (!scorecard.is_open_voting && !!scorecard.voting_url) {
      setIsFinishVoting(true);
      fetchVotingIndicators();
    }
    else
      setIsFinishVoting(false);

    if (!scorecard.is_open_voting && !scorecard.voting_url)
      openVoting();
    else
      loadVotingQr();
  }, []);

  const fetchVotingIndicators = () => {
    const indicators = VotingIndicator.getAll(props.route.params.scorecard_uuid);
    setVotingIndicators(indicators);
  }

  const openVoting = () => {
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
    confirmationModalRef.current?.dismiss()
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        setIsLoading(true);
        scorecardProgressService.setOpenCloseVoting({
          scorecardUuid: props.route.params.scorecard_uuid,
          isOpen: false,
          successCallback: () => {
            Scorecard.update(props.route.params.scorecard_uuid, { is_open_voting: false });
            setIsFinishVoting(true);
            setIsOpenVoting(false);
            scorecardTracingStepsService.trace(props.route.params.scorecard_uuid, 7);
            fetchVotingResult();
          },
          errroCallback: (error) => {
            setIsLoading(false);
            setErrorType(ERROR_CLOSE_VOTING);
            setVisibleModal(true);
          }
        });
      }
      else
        internetConnectionService.showAlertMessage(translations.noInternetConnection)
    });
  }

  const fetchVotingResult = () => {
    votingResultService.getVotingResultsByScorecard(props.route.params.scorecard_uuid, () => {
      fetchVotingIndicators();
      setIsLoading(false);
    }, () => {
      setIsLoading(false);
      setErrorType(ERROR_FETCH_VOTING_RESULT);
      setVisibleModal(true);
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

  const openVotingComponents = () => {
    if (isLoading)
      return <View/>

    return (
      <React.Fragment>
        { (!isOpenVoting && !votingObj.qr_code) && openVotingButton() }

        { (isOpenVoting && !votingObj.qr_code) && downloadQrCodeButton() }

        { (isOpenVoting&& !!votingObj.qr_code) &&
          <VotingQrCode
            scorecardUuid={props.route.params.scorecard_uuid}
            votingObj={votingObj}
            showErrorModal={(type) => {
              setErrorType(type);
              setVisibleModal(true);
            }}
            updateTotalVotes={(value) => {
              setTotalVotes(value);
            }}
          />
        }
      </React.Fragment>
    )
  }

  const isActionButtonDisabled = () => {
    if (isFinishVoting)
      return false;

    if (isOpenVoting)
      return totalVotes == 0;

    return !isOpenVoting || isLoading
  }

  const showCloseVotingConfirmation = () => {
    confirmationModalRef.current?.setContent(
      <ConfirmationBottomSheetContent
        title={translations.closeVoting}
        confirmationMessage={translations.formatString(translations.closeVotingCofirmation, totalVotes)}
        notice={translations.closeVotingNotice}
        onPress={() => closeVoting()}
      />
    );
    confirmationModalRef.current?.present();
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
              ? <View style={{ height: '100%', paddingTop: hp('2%'), paddingBottom: 32 }}>
                  <VotingResult
                    scorecardUuid={props.route.params.scorecard_uuid}
                    votingIndicators={votingIndicators}
                    infoModalRef={infoModalRef}
                    votingInfoModalRef={votingInfoModalRef}
                  />
                </View>
              : openVotingComponents()
            }
          </ScrollView>
        </Animated.View>
        <View style={bottomButtonContainerPadding()}>
          <BottomButton
            onPress={() => isFinishVoting ? goToNextScreen() : showCloseVotingConfirmation()}
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
      <VotingInfoModal ref={infoModalRef} votingInfoModalRef={votingInfoModalRef} snapPoints={[]} />
      <ErrorAlertMessage
        visible={visibleModal}
        errorType={errorType}
        scorecardUuid={props.route.params.scorecard_uuid}
        onDismiss={() => setVisibleModal(false)}
      />

      <DynamicHeightBottomSheetModal ref={confirmationModalRef} />
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