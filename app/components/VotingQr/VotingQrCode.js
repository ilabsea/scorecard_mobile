import React, {useContext, useEffect, useState} from 'react';
import { View, Image, Dimensions, Linking, StyleSheet, Share, PermissionsAndroid } from 'react-native';
import { Text } from 'react-native-paper';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';
import { getDeviceStyle } from '../../utils/responsive_util';
import { ERROR_SHARE_VOTING_LINK } from '../../constants/error_constant';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize } from '../../utils/font_size_util';
import onlineScorecardSubmissionService from '../../services/online_scorecard_submission_service';

const contentFontSize = bodyFontSize();

const VotingQrCode = (props) => {
  const { translations } = useContext(LocalizationContext);
  const screenWidth = Dimensions.get('screen').width;
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    checkPermission();
    fetchVotingPoll();
    const interval = setInterval(() => {
      fetchVotingPoll();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const checkPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
  }

  const fetchVotingPoll = () => {
    onlineScorecardSubmissionService.getVotingPoll({
      scorecardUuid: props.scorecardUuid,
      successCallback: (response) => {
        setTotalVotes(response['total_votes']);
        props.updateTotalVotes(response['total_votes']);
      }
    });
  }

  const shareLink = () => {
    try {
      Share.share({
        message: props.votingObj.url,
      })
    } catch(error) {
      props.showErrorModal(ERROR_SHARE_VOTING_LINK);
    }
  }

  return (
    <React.Fragment>
      <Text style={[styles.label, { marginTop: 16, textAlign: 'center' }]}>
        { translations.scanQrCodeToVote }
      </Text>

      <Image source={{ uri: `file://${props.votingObj.qr_code}` }}
        style={{width: screenWidth - 100, height: screenWidth - 100, alignSelf: 'center', marginTop: 22, borderRadius: 16}}
      />

      <Text style={[styles.label, { marginTop: 16, textAlign: 'center' }]}>
        { translations.orVoteViaTheLink }
      </Text>
      <View style={styles.buttonContainer}>
        <View style={{flex: 1}}>
          <OutlinedButton
            icon="add-outline"
            label={translations.voting}
            onPress={() => {
              if (!!props.votingObj.url)
                Linking.openURL(props.votingObj.url);
            }}
            labelStyle={[styles.buttonLabel, {color: 'white'}]}
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
            labelStyle={styles.buttonLabel}
          />
        </View>
      </View>
      <View style={{paddingTop: 12, alignItems: 'center'}}>
        <Text style={styles.label}>{translations.totalVotes}: {totalVotes}</Text>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: contentFontSize,
    fontFamily: FontFamily.body
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 16
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: getDeviceStyle(18, 14),
    marginTop: getDeviceStyle(6, 4)
  }
});

export default VotingQrCode;