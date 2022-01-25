import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { LocalizationContext } from './Translations';
import internetConnectionService from '../services/internet_connection_service';

class PullToRefreshScrollView extends React.Component {
  static contextType = LocalizationContext;

  syncData() {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        this.props.updateLoadingState(true);
        this.props.syncData();
      }
      else
        internetConnectionService.showAlertMessage(this.context.translations.noInternetConnection,);
    });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={this.props.containerStyle}
        stickyHeaderIndices={this.props.stickyIndices}
        refreshControl={
          <RefreshControl
            enabled={this.props.allowPullToRefresh}
            refreshing={this.props.isLoading}
            onRefresh={() => this.syncData()}
          />
        }
      >
        { this.props.children }
      </ScrollView>
    )
  }
}

export default PullToRefreshScrollView;