import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import CardItem from '../Share/CardItem';
import SwipeableDeleteButton from '../Share/SwipeableDeleteButton';
import Color from '../../themes/color';
import { smallTextFontSize } from '../../utils/font_size_util';
import uuidv4 from '../../utils/uuidv4';

class EndpointUrlCard extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = null;
    this.state = {
      isDeleteable: true,
    }
  }

  renderBadge() {
    return <View style={[styles.badge, {backgroundColor: this.props.endpoint.shortcut_color}]}>
            <Text style={[styles.badgeLabel, {color: 'white'}]}>{ this.props.endpoint.shortcut }</Text>
           </View>
  }

  renderContent() {
    return <React.Fragment>
              <View style={{flexDirection: 'row'}}>
                <Text>{ this.props.endpoint.label }</Text>
                { this.renderBadge() }
              </View>
              <Text style={{color: Color.grayColor}}>{ `${this.props.endpoint.email}@${this.props.endpoint.value}` }</Text>
           </React.Fragment>
  }

  renderDeleteAction = () => {
    return <SwipeableDeleteButton onPress={() => console.log('delete endpoint url')}
            containerStyle={{marginTop: 4, height: '83%'}} />
  }

  render() {
    return (
      <Swipeable key={uuidv4()}
        ref={ref => { this.itemRef = ref }}
        enabled={this.state.isDeleteable}
        renderRightActions={this.renderDeleteAction}
        containerStyle={{backgroundColor: 'white', padding: 4, marginHorizontal: -4}}
      >
        <CardItem
          content={this.renderContent()}
          containerStyle={{ paddingVertical: 16, marginBottom: 10 }}
          onPress={() => console.log('press endpoint url')}
        />
      </Swipeable>
    )
  }
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    marginLeft: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25
  },
  badgeLabel: {
    fontSize: smallTextFontSize(),
    textTransform: 'uppercase'
  }
});

export default EndpointUrlCard;