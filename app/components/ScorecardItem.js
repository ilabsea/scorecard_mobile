import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

import { LocalizationContext } from '../components/Translations';
import { Icon } from 'native-base';
import Color from '../themes/color';
import uuidV4 from '../utils/uuidv4';
import scorecardProgress from '../db/jsons/scorecardProgress';
import styles from '../themes/scorecardListItemStyle';
import votingCriteriaService from '../services/votingCriteriaService';
import scorecardHelper from '../helpers/scorecard_helper';

import { getDeviceStyle } from '../utils/responsive_util';
import ScorecardItemTabletStyles from '../styles/tablet/ScorecardItemComponentStyle';
import ScorecardItemMobileStyles from '../styles/mobile/ScorecardItemComponentStyle';
import { FontFamily } from '../assets/stylesheets/theme/font';

const responsiveStyles = getDeviceStyle(ScorecardItemTabletStyles, ScorecardItemMobileStyles);

export default class ScorecardItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.itemRef = null;
  }

  renderStatusIcon(scorecard) {
    const { translations } = this.context;
    let wrapperStyle = scorecard.isInLastPhase ? {} : { backgroundColor: Color.headerColor };
    let iconName     = scorecard.isInLastPhase ? 'check' : 'file-alt';

    return (
      <View style={[styles.statusIconWrapper, wrapperStyle]}>
        <Icon name={iconName} type="FontAwesome5" style={responsiveStyles.statusIcon} />
        { scorecard.isUploaded && <Icon name={'lock-closed'}  style={[{position: 'absolute', bottom: 6, right: 6, color: Color.whiteColor}, responsiveStyles.lockIcon]}/> }
        { (scorecard.finished && !scorecard.isUploaded) &&
          <Text style={{position: 'absolute', bottom: 2, fontSize: getDeviceStyle(16, 11), color: Color.whiteColor, textAlign: 'center', width: '100%'}}>
            { translations.finished }
          </Text>
        }
      </View>
    )
  }

  deleteScorecard = () => {
    this.props.showDeleteModal();
    this.itemRef.close();
  }

  renderDeleteAction = () => {
    const { translations } = this.context;

    return (
      <RectButton
        onPress={() => this.deleteScorecard()}
        style={responsiveStyles.deleteContainer}
      >
        <Text style={[{color: Color.whiteColor}, responsiveStyles.deleteLabel]}>{ translations.delete }</Text>
      </RectButton>
    )
  }

  render() {
    const { translations, appLanguage } = this.context;
    let scorecard = this.props.scorecard || {};
    let status = !!scorecard.status ? translations[scorecardProgress.filter(x => x.value == scorecard.status)[0].label] : '';
    let criteriasSize = votingCriteriaService.getAll(scorecard.uuid).length;

    return (
      <Swipeable
        ref={ref => { this.itemRef = ref }}
        key={uuidV4()}
        enabled={!scorecard.isUploaded}
        renderRightActions={this.renderDeleteAction}
        containerStyle={responsiveStyles.swipeableContainer}
      >
        <TouchableOpacity
          key={uuidV4()}
          onPress={ () => this.props.onPress() }
          style={[styles.listItem, styles.card]}>

          { this.renderStatusIcon(scorecard) }

          <View style={styles.contentWrapper}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 20, marginTop: -5, marginBottom: -6}}>
              <Text style={styles.title}>ID: {scorecard.uuid} </Text>
              <Text style={responsiveStyles.subTitle} numberOfLines={1}>({scorecard.subTitle})</Text>
            </View>

            <View style={styles.subTextWrapper}>
              <Icon name='people' style={styles.subTextIcon} />
              <Text style={styles.subText}>{translations.numberOfCriteria}: {criteriasSize}</Text>
            </View>

            <View style={styles.subTextWrapper}>
              <Icon name='document-text' style={styles.subTextIcon} />
              <Text style={styles.subText}>{translations.status}: {status}</Text>
            </View>

            { scorecard.isUploaded &&
              <Text style={{ fontSize: 10, color: Color.redColor, fontFamily: FontFamily.title}}>
                {translations.thisWillScorecardWillBeRemoveIn}: { scorecardHelper.getTranslatedRemoveDate(scorecard.uploaded_date, appLanguage) }
              </Text>
            }

            <View style={{flex: 1}}></View>

            <View style={[styles.viewDetail, responsiveStyles.viewDetailContainer]}>
              <Text style={[{color: Color.headerColor}, responsiveStyles.viewDetailLabel]}>{translations['viewDetail']}</Text>
              <Icon name='chevron-forward-outline' style={[{color: Color.headerColor}, responsiveStyles.viewDetailIcon]} />
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }
}
