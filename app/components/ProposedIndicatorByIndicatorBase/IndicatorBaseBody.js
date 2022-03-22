import React from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';

import CreateNewIndicatorContent from '../CreateNewIndicator/CreateNewIndicatorContent';
import CreateNewIndicatorBottomButton from '../CreateNewIndicator/CreateNewIndicatorBottomButton';

import Color from '../../themes/color';
import ProposedIndicator from '../../models/ProposedIndicator';
import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';

class IndicatorBaseBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isValid: false,
      // selectedCustomIndicator: null,
      // participantUuid: props.participantUuid,
    }
  }

  componentDidMount() {
    const proposedIndicators = ProposedIndicator.getAllByScorecard(this.props.scorecardUuid);
    this.setState({ isValid: (!!proposedIndicators && proposedIndicators.length > 0) });
  }

  renderContent() {
    return <CreateNewIndicatorContent
            scorecardUuid={this.props.scorecardUuid}
            participantUuid={null}
            indicators={this.props.indicators}
            isSearching={this.props.isSearching}
            isEdit={this.props.isEdit}
            selectForEdit={(indicator) => this.selectForEdit(indicator)}
            updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
            showAddNewIndicatorModal={() => this.setState({ isModalVisible: true })}
            updateIndicatorList={() => this.props.updateIndicatorList()}
            openParticipantList={(indicator) => this.props.openParticipantList(indicator)}
          />
  }

  renderBottomButton = () => {
    return <CreateNewIndicatorBottomButton
            isSearching={this.props.isSearching}
            isEdit={this.props.isEdit}
            isValid={this.state.isValid}
            save={() => this.props.save()}
            stopEditing={() => this.props.updateEditStatus(false)}
            stopSearching={() => this.props.updateSearchStatus(false)}
            updateIndicatorList={() => this.props.updateIndicatorList()}
            scorecardUuid={this.props.scorecardUuid}
          />
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.whiteColor, padding: containerPadding, paddingBottom: 0, paddingTop: containerPaddingTop}}>
        { this.renderContent() }
        { this.renderBottomButton() }
      </View>
    )
  }
}

export default IndicatorBaseBody;