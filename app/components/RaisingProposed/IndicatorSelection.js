import React, {Component} from 'react';
import { LayoutAnimation, UIManager } from 'react-native';

import {LocalizationContext} from '../Translations';
import RaisingProposedScrollView from './RaisingProposedScrollView';
import IndicatorSelectionItems from './IndicatorSelectionItems';
import AddNewIndicatorButton from './AddNewIndicatorButton';
import NoIndicatorMessage from './NoIndicatorMessage';

class IndicatorSelection extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scrollDirection: 'up',
    };
    this.scrollOffset = 0;

    if (UIManager.setLayoutAnimationEnabledExperimental)
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  renderAddNewIndicatorButton() {
    return <AddNewIndicatorButton
             scrollDirection={this.state.scrollDirection}
             showAddNewIndicatorModal={() => this.props.showAddNewIndicatorModal()}
           />
  }

  onScroll(event) {
    const currentOffset = event.nativeEvent.contentOffset.y;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({ scrollDirection: currentOffset > this.scrollOffset ? 'down' : 'up' });
    this.scrollOffset = currentOffset;
  }

  render() {
    return (
      <React.Fragment>
        { this.props.indicators.length > 0 &&
          <RaisingProposedScrollView onScroll={(event) => this.onScroll(event)}>
            <IndicatorSelectionItems
              indicators={this.props.indicators}
              isSearching={this.props.isSearching}
              scorecardUuid={this.props.scorecardUuid}
              participantUuid={this.props.participantUuid}
              isIndicatorBase={this.props.isIndicatorBase}
              updateIndicatorList={() => this.props.updateIndicatorList()}
              formModalRef={this.props.formModalRef}
              participantModalRef={this.props.participantModalRef}
            />
          </RaisingProposedScrollView>
        }

        { this.props.indicators.length === 0 && <NoIndicatorMessage /> }

        { !this.props.isSearching && this.renderAddNewIndicatorButton() }
      </React.Fragment>
    )
  }
}

export default IndicatorSelection;
