import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler} from 'react-native';
import { connect } from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';
import BigHeader from '../../components/BigHeader';
import {LocalizationContext} from '../../components/Translations';
import DisplayScorecardInfo from '../../components/ScorecardDetail/DisplayScorecardInfo';
import ScorecardDetailSyncButton from '../../components/ScorecardDetail/ScorecardDetailSyncButton';
import ErrorAlertMessage from '../../components/Share/ErrorAlertMessage';
import BottomButton from '../../components/BottomButton';
import Scorecard from '../../models/Scorecard';
import Color from '../../themes/color';
import { navigateHome } from '../../utils/navigation_util';
import { getDeviceStyle, containerPadding, bottomButtonContainerPadding } from '../../utils/responsive_util';
import { screenPaddingBottom } from '../../utils/component_util';
import ScorecardDetailTabletStyles from '../../styles/tablet/ScorecardDetailScreenStyle';
import ScorecardDetailMobileStyles from '../../styles/mobile/ScorecardDetailScreenStyle';

const responsiveStyles = getDeviceStyle(ScorecardDetailTabletStyles, ScorecardDetailMobileStyles);

class ScorecardDetail extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
      isLoading: false,
      modalVisible: false,
      errorType: null,
    };
    this.backHandler = null;
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigateHome()
      return true;
    })
  }

  componentWillUnmount() {
    !!this.backHandler && this.backHandler.remove()
  }

  startScorecard = () => {
    this.props.navigation.navigate('ScorecardPreference', {
      scorecard_uuid: this.props.route.params.scorecard_uuid,
      local_ngo_id: this.state.scorecard.local_ngo_id
    });
  }

  finishSyncData() {
    this.setState({
      scorecard: Scorecard.find(this.props.route.params.scorecard_uuid),
      isLoading: false,
    })
  }

  syncDataButton() {
    return (
      <ScorecardDetailSyncButton scorecardUuid={this.props.route.params.scorecard_uuid}
        updateLoadingStatus={(status) => this.setState({ isLoading: status })}
        finishSyncData={() => this.finishSyncData()}
        showErrorMessage={(errorType) => this.setState({ modalVisible: true, errorType })}
      />
    )
  }

  _renderHeader() {
    const {translations} = this.context;
    const title = `${translations.scorecardApp} - ${this.props.route.params.scorecard_uuid}`;

    return <BigHeader title={translations.welcomeTo} bigTitle={title} rightButton={this.syncDataButton()} onPressBack={() => navigateHome()} />
  }

  _renderErrorMessageModal() {
    return (
      <ErrorAlertMessage
        visible={this.state.modalVisible}
        errorType={this.state.errorType}
        scorecardUuid={this.props.route.params.scorecard_uuid}
        onDismiss={() => this.setState({ modalVisible: false })}
      />
    )
  }

  render() {
    const {translations} = this.context;

    return (
      <React.Fragment>
        {this._renderHeader()}

        <View style={{flex: 1, paddingBottom: screenPaddingBottom(this.props.sdkVersion), paddingTop: 16}}>
          <Spinner
            visible={this.state.isLoading}
            color={Color.primaryColor}
            overlayColor={Color.loadingBackgroundColor}
          />

          <ScrollView contentContainerStyle={[styles.container, responsiveStyles.container]}>
            <Text style={responsiveStyles.title}>{translations.pleaseCheckScorecardDetailBelow}</Text>
            <DisplayScorecardInfo scorecardDetail={this.state.scorecard}/>
          </ScrollView>

          <View style={bottomButtonContainerPadding()}>
            <BottomButton label={translations.next} onPress={() => this.startScorecard()} />
          </View>

          { this._renderErrorMessageModal() }
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: containerPadding,
    paddingBottom: 28,
    paddingTop: 0,
  },
});

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
)(ScorecardDetail);