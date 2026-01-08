import React, {useContext, useEffect, useState} from 'react';
import { Animated, View, ScrollView, Image, Dimensions, Linking, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import Share from 'react-native-share';

import Color from '../../themes/color';
import { LocalizationContext } from '../../components/Translations';
import CollapsibleNavHeader from '../../components/Share/CollapsibleNavHeader';
import ErrorAlertMessage from '../../components/Share/ErrorAlertMessage';
import BottomButton from '../../components/BottomButton';
import { screenPaddingBottom } from '../../utils/component_util';
import {
  bottomButtonContainerPadding,
  passProposeStepContainerPaddingTopInput,
  passProposeStepContainerPaddingTopOutput,
  getDeviceStyle
} from '../../utils/responsive_util';
import { headerShrinkOffset } from '../../constants/component_style_constant';
import Scorecard from '../../models/Scorecard';
import scorecardProgressService from '../../services/scorecard_progress_service';
import ScorecardApi from '../../api/ScorecardApi';
import onlineScorecardSubmissionService from '../../services/online_scorecard_submission_service';
import OutlinedButton from '../../components/OutlinedButton';
import { ERROR_DOWNLOAD_VOTING_QR, ERROR_SOMETHING_WENT_WRONG } from '../../constants/error_constant';

const VotingQr = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [visibleModal, setVisibleModal] = useState(false);
  const [votingObj, setVotingObj] = useState({ qr_code: null, url: null });
  const [errorType, setErrorType] = useState(null);
  const scorecardApi = new ScorecardApi();

  const scrollY = new Animated.Value(0)
  var isHeaderShrunk = false

  useEffect(() => {
    const scorecard = Scorecard.find(props.route.params.scorecard_uuid);
    console.log('=== is scorecard opened = ', scorecard.is_open_voting);

    if (!scorecard.is_open_voting) {
      scorecardProgressService.setOpenCloseVoting({
        scorecardUuid: props.route.params.scorecard_uuid,
        isOpen: true,
        successCallback: () => {
          Scorecard.update(props.route.params.scorecard_uuid, { is_open_voting: true });
          downloadQrCode();
        },
        errroCallback: (error) => {
          console.log('==== Error Open voting scorecard = ', error);
        }
      });
    }
    else
      loadVotingQr();
  }, []);

  // const openVoting = () => {
  //   scorecardProgressService.setOpenCloseVoting({
  //     scorecardUuid: props.route.params.scorecard_uuid,
  //     isOpen: true,
  //     successCallback: () => {
  //       Scorecard.update(props.route.params.scorecard_uuid, { is_open_voting: true });

  //       downloadQrCode();
  //     },
  //     errroCallback: (error) => {
  //       console.log('==== Error Open voting scorecard = ', error);
  //     }
  //   });
  // }

  const loadVotingQr = () => {
    const scorecard = Scorecard.find(props.route.params.scorecard_uuid)
    console.log('== qr code = ', scorecard.voting_qr);
    // console.log('== voting url = ', scorecard.voting_url);

    setVotingObj({
      qr_code: scorecard.voting_qr,
      url: scorecard.voting_url
    });
  }


  const downloadQrCode = async () => {
    onlineScorecardSubmissionService.downloadVotingQrCode({
      scorecardUuid: props.route.params.scorecard_uuid,
      successCallback: (qrCodeFilePath) => {
        loadVotingQr();
      },
      errorCallback: (error) => {
        setErrorType(ERROR_DOWNLOAD_VOTING_QR);
        setVisibleModal(true);
      }
    })
  }

  const shareLink = () => {
    Share.open({ url: votingObj.url, failOnCancel: false })
      .catch((error) => {
        // Todo: update the error message when failed to share the VOTING LINK
        setErrorType(ERROR_SOMETHING_WENT_WRONG);
        setVisibleModal(true)
      })
  }

  const _goNext = () => {
    const scorecard = Scorecard.find(props.route.params.scorecard_uuid);
    console.log('=== is scorecard open = ', scorecard.is_open_voting);
    console.log('== QR code = ', qrCode);

    // onlineScorecardSubmissionService.draftSubmit({
    //   scorecardUuid: props.route.params.scorecard_uuid,
    //   successCallback: () => {
    //     // Todo: Send API request to download the QR code image
    //   },
    //   errorCallback: (errorType) => {
    //     setErrorType(errorType != ERROR_NOT_FOUND ? errorType : ERROR_DRAFT_SUBMIT);
    //     setVisibleModal(true);
    //   }
    // });
  }

  const _renderBody = () => {
    const containerPaddingTop = scrollY.interpolate({
      inputRange: passProposeStepContainerPaddingTopInput,
      outputRange: passProposeStepContainerPaddingTopOutput,
      extrapolate: 'clamp',
    })
    const screenWidth = Dimensions.get('screen').width;

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

            {/* Todo: show a download QR code button, if the scorecard is 'open_voting' and has not qr code yet */}


            {/* <TouchableOpacity onPress={() => downloadQrCode()}
              style={{width: 100, height: 50, backgroundColor: 'green'}}
            >
              <Text>Download</Text>
            </TouchableOpacity> */}

            <Image source={{ uri: `file://${votingObj.qr_code}` }}
              style={{width: screenWidth - 100, height: screenWidth - 100, alignSelf: 'center', marginTop: 22}}
            />

            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 32, paddingHorizontal: 16}}>
              <View style={{flex: 1}}>
                <OutlinedButton
                  icon="add-outline"
                  label={translations.voting}
                  onPress={() => {
                    if (!!votingObj.url)
                      Linking.openURL(votingObj.url);
                  }}
                  labelStyle={{textAlign: 'center', fontSize: getDeviceStyle(18, 14), marginTop: getDeviceStyle(6, 4), color: 'white'}}
                  iconStyle={{color: 'white'}}
                />
              </View>

              <View style={{width: 16}}/>

              <View style={{flex: 1}}>
                <OutlinedButton
                  icon="share-outline"
                  label={translations.shareLink}
                  onPress={() => shareLink() }
                  buttonStyle={{ backgroundColor: 'transparent', borderWidth: 2, borderColor: Color.primaryButtonColor }}
                  labelStyle={{textAlign: 'center', fontSize: getDeviceStyle(18, 14), marginTop: getDeviceStyle(6, 4)}}
                />
              </View>
            </View>
            

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