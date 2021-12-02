import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import realm from '../../db/schema';

import Color from '../../themes/color';

import {LocalizationContext} from '../../components/Translations';
import ParticipantListItem from '../../components/ParticipantList/ParticipantListItem';
import BottomButton from '../../components/BottomButton';
import ProgressHeader from '../../components/ProgressHeader';
import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';
import OutlinedButton from '../../components/OutlinedButton';
import NoDataMessage from '../../components/NoDataMessage';

import Participant from '../../models/Participant';
import scorecardStepService from '../../services/scorecard_step_service';

import { getDeviceStyle, containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import ParticipantListTabletStyles from '../../styles/tablet/ParticipantListScreenStyle';
import ParticipantListMobileStyles from '../../styles/mobile/ParticipantListScreenStyle';

const responsiveStyles = getDeviceStyle(ParticipantListTabletStyles, ParticipantListMobileStyles);
class ParticipantList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.totalParticipant = 0;
    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    this.fetchParticipant();
  }

  fetchParticipant = () => {
    const participants = realm.objects('Participant').filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'"').sorted('order', false);
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
  }

  renderListHeader = () => {
    if (this.props.participants.length > 0) {
      const {translations} = this.context;
      const tableHeads = ['gender', 'age', 'disability', 'minority', 'poor', 'youth'];
      const doms = tableHeads.map((col, index) =>
        <View style={styles.itemColumn} key={index}>
          <Text style={responsiveStyles.itemTitle}>{translations[col]}</Text>
        </View>
      )

      return (
        <View style={{flexDirection: 'row', paddingBottom: 16}}>
          <View style={responsiveStyles.orderNumberHeaderContainer}>
            <Text style={responsiveStyles.itemTitle}>{translations.no}</Text>
          </View>

          { doms }

          <View style={[{alignItems: 'center', justifyContent: 'center'}, responsiveStyles.actionColumn]}>
            <Text style={responsiveStyles.itemTitle}>{translations.action}</Text>
          </View>
        </View>
      );
    }
  }

  renderParticipantList = () => {
    const numberOfParticipant = realm.objects('Scorecard').filtered('uuid = "' + this.props.route.params.scorecard_uuid + '"')[0].number_of_participant;
    this.totalParticipant = numberOfParticipant;

    let doms = null;

    if (Participant.getAll(this.props.route.params.scorecard_uuid).length > 0) {
      doms = this.props.participants.map((participant, index) =>
        <ParticipantListItem key={index} index={index} participant={participant}
          navigation={this.props.navigation} scorecardUUID={this.props.route.params.scorecard_uuid}
        />
      )
    }

    return doms;
  }

  renderTitleWithAddNewButton() {
    const {translations} = this.context;

    return (
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
          <Text style={responsiveStyles.titleLabel}>
            {translations.participantList}
          </Text>

          <Text style={responsiveStyles.participantNumberLabel}>
            ({ this.props.participants.length } { translations.pax })
          </Text>
        </View>

        { this.props.participants.length > 0 &&
          <OutlinedButton
            icon="plus"
            label={translations.addNewParticipant}
            onPress={() => this.addNewParticipant() }
          />
        }
      </View>
    )
  }

  renderNoData() {
    const { translations } = this.context;

    return (
      <NoDataMessage
        title={translations.pleaseAddParticipant}
        buttonLabel={translations.addNewParticipant}
        onPress={() => this.addNewParticipant()}
      />
    );
  }

  addNewParticipant = () => {
    this.props.navigation.navigate('AddNewParticipant', {scorecard_uuid: this.props.route.params.scorecard_uuid});
  }

  next = () => {
    scorecardStepService.recordStep(this.props.route.params.scorecard_uuid, 4);
    this.props.navigation.navigate('OfflineRaisingProposed', {scorecard_uuid: this.props.route.params.scorecard_uuid})
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, backgroundColor: Color.whiteColor}}>
          <ProgressHeader
            title={translations.getStarted}
            progressIndex={2}
          />

          <ScrollView contentContainerStyle={styles.container}>
            { this.renderTitleWithAddNewButton() }
            { this.renderListHeader() }
            { this.renderParticipantList() }

            { this.props.participants.length == 0 && this.renderNoData() }
          </ScrollView>

          <View style={{padding: containerPadding}}>
            <BottomButton
              label={translations.next}
              onPress={() => this.next()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: containerPadding,
    paddingHorizontal: 14,
    flexGrow: 1,
    paddingTop: containerPaddingTop,
  },
  itemColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);
