import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import AsyncStorage from '@react-native-community/async-storage';

import { LocalizationContext } from '../Translations';
import { getDeviceStyle } from '../../utils/responsive_util';
import indicatorDevelopmentTooltipTabletStyles from '../../styles/tablet/IndicatorDevelopmentTooltipComponentStyle';
import indicatorDevelopmentTooltipMobileStyles from '../../styles/mobile/IndicatorDevelopmentTooltipComponentStyle';

const styles = getDeviceStyle(indicatorDevelopmentTooltipTabletStyles, indicatorDevelopmentTooltipMobileStyles);

class IndicatorDevelopmentTooltip extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.isComponentUnmount = false;
  }

  async componentDidMount() {
    const hasShown = await AsyncStorage.getItem('DRAG_DROP_TOOLTIP');

    setTimeout(() => {
      if (!this.isComponentUnmount && !hasShown)
        this.props.updateTooltipStatus(true);
    }, 200);
  }

  componentWillUnmount() {
    this.isComponentUnmount = true;
  }

  tipContent() {
    if (this.props.index != 0)
      return (<View style={{opacity: 0}}/>);

    return (
      <View style={{flexDirection: 'column'}}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/drag_and_drop_indicator.gif')}
            style={styles.instructionImage}
          />
        </View>

        <TouchableOpacity onPress={() => this.close()} style={styles.closeButton}>
          <Text style={styles.closeLabel}>{ this.context.translations.infoCloseLabel }</Text>
        </TouchableOpacity>
      </View>
    )
  }

  close() {
    AsyncStorage.setItem('DRAG_DROP_TOOLTIP', 'true');
    this.props.updateTooltipStatus(false);
  }

  contentStyles() {
    const contentStyles = {
      0: styles.content,
      'default': {opacity: 0, width: 0}
    };

    return !!contentStyles[this.props.index] ? contentStyles[this.props.index] : contentStyles['default'];
  }

  arrowSize() {
    const arrowStyles = {
      0: { width: 16, height: 8 },
      'default': { width: 0, height: 0 }
    };

    return !!arrowStyles[this.props.index] ? arrowStyles[this.props.index] : arrowStyles['default'];
  }

  render() {
    return (
      <View>
        <Tooltip
          isVisible={this.props.isTooltipVisible}
          content={this.tipContent()}
          contentStyle={this.contentStyles()}
          placement="top"
          onClose={() => this.close()}
          arrowSize={this.arrowSize()}
          arrowStyle={{opacity: this.props.index == 0 ? 1 : 0}}
          backgroundColor={this.props.index == 0 ? 'rgba(0,0,0,0.5)' : null}
        >
          { this.props.children }
        </Tooltip>
      </View>
    )
  }
}

export default IndicatorDevelopmentTooltip;