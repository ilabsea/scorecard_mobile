import React, {useContext} from 'react';
import { Animated, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import CollapsibleNavHeader from '../../components/Share/CollapsibleNavHeader';
import { screenPaddingBottom } from '../../utils/component_util';
import { containerPaddingTop } from '../../utils/responsive_util';
import { headerShrinkOffset } from '../../constants/component_style_constant';

const VotingQr = (props) => {
  const { translations } = useContext(LocalizationContext);
  const scrollY = new Animated.Value(0)
  var isHeaderShrunk = false

  const _renderBody = () => {
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
            <View style={{height: 600, backgroundColor: 'green'}}></View>
            <View style={{height: 500, backgroundColor: 'blue'}}></View>
          </ScrollView>
        </Animated.View>
      </React.Fragment>
    )
  }

  return (
    <View style={{height: '100%', paddingBottom: screenPaddingBottom(props.sdkVersion)}}>
      { _renderBody() }
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