import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Imagebackground, ImageBackground} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import CriteriaAudioButton from './CriteriaAudioButton';
import {getLanguageIndicator} from '../../services/language_indicator_service';
import indicatorHelper from '../../helpers/indicator_helper';

const windowWidth = Math.floor(Dimensions.get('window').width);
const itemWidth = windowWidth >= 550 ? (windowWidth - 60) / 2 : (windowWidth - 40);

class CriteriaSelection extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.audioPlayer = null;
    this.state = {
      indicators: [],
      selectedIndicators: [],
      unselectedIndicators: [],
      isModalVisible: false,
      playingIndicatorId: null,
      audioIcon: 'play-arrow',
      customIndicator: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return indicatorHelper.getIndicatorsState(props, state)
  }

  componentWillUnmount() {
    if (this.audioPlayer != null)
      this.audioPlayer.release();
  }

  shortcutColor = (indicator) => {
    return indicator.isSelected ? {color: '#ffffff'} : {};
  }

  selectIndicator = (index) => {
    let indicators = this.state.indicators;
    let selectedIndicators = this.state.selectedIndicators;
    let unselectedIndicators = this.state.unselectedIndicators;

    if (indicators[index].isSelected) {
      selectedIndicators = selectedIndicators.filter((indicator) => indicator.uuid !== indicators[index].uuid);
      unselectedIndicators.push(indicators[index]);
    }
    else if (indicators[index].uuid != '') {
      selectedIndicators.push(indicators[index]);
      unselectedIndicators = unselectedIndicators.filter((indicator) => indicator.uuid !== indicators[index].uuid);
    }

    indicators[index].isSelected = !indicators[index].isSelected;

    this.setState({
      indicators,
      selectedIndicators,
      unselectedIndicators,
      isModalVisible: index === indicators.length - 1 ? true : false,
    }, () => {this.props.selectIndicator();});
  }

  selectedCriteriaBoxStyle = (indicator) => {
    if (indicator.isSelected || (this.state.customIndicator != null && this.state.customIndicator.uuid == indicator.uuid))
      return { borderColor: Color.primaryButtonColor, borderWidth: 2 };

    return {};
  }

  updateAudioState = (indicatorId, audioPlayer) => {
    this.setState({playingIndicatorId: indicatorId});
    this.audioPlayer = audioPlayer;
  }

  getIndicatorName = (indicator) => {
    const languageIndicator = getLanguageIndicator(this.props.scorecardUUID, indicator.uuid, 'text');

    if (languageIndicator != undefined)
      return languageIndicator.content != '' ? languageIndicator.content : indicator.name.split(":").pop();

    return indicator.name.split(":").pop();
  }

  indicatorCard = (indicator, index) => {
    let displayName = this.getIndicatorName(indicator);
    let iconContainerStyle = !!indicator.local_image ? {backgroundColor: 'transparent'} : {};
    let isAddNewCriteriaIndex = index == this.state.indicators.length - 1;

    return (
      <View key={index} style={[styles.criteriaBoxContainer, this.selectedCriteriaBoxStyle(indicator)]}>
        <TouchableOpacity style={styles.criteriaBox}
          onPress={() => this.selectIndicator(index)}>
          <View style={[styles.iconContainer, iconContainerStyle]}>
            { !isAddNewCriteriaIndex && !!indicator.local_image &&
              <ImageBackground source={{uri: `file://${indicator.local_image}`}} style={styles.indicatorImage} resizeMode='contain' />
            }
            { isAddNewCriteriaIndex && <MaterialIcon name="add" size={50} color={indicator.isSelected ? "#ffffff" : "#787878"} />}
          </View>

          <View style={styles.detailContainer}>
            <Text style={{textAlign: 'left'}} numberOfLines={3} ellipsizeMode='tail'>{displayName}</Text>
          </View>
        </TouchableOpacity>

        <CriteriaAudioButton indicator={indicator} audioPlayer={this.audioPlayer}
          playingIndicatorId={this.state.playingIndicatorId}
          updateAudioState={this.updateAudioState}
          scorecardUUID={this.props.scorecardUUID}
          isAddNewCriteria={isAddNewCriteriaIndex}
        />
      </View>
    )
  }

  renderIndicatorItem = (indicator, index) => {
    if (index === this.state.indicators.length - 1 && this.state.indicators.length%2 != 0) {
      return (
        <View key={index} style={{flexDirection: 'row', width: '100%'}}>
          {this.indicatorCard(indicator, index)}
          <View style={{flex: 1, marginHorizontal: 10}} />
        </View>
      )
    }

    return this.indicatorCard(indicator, index);
  }

  render() {
    let doms = this.state.indicators.map((item, index) =>
      this.renderIndicatorItem(item, index)
    )

    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -10}}>
        {doms}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  criteriaBoxContainer: {
    backgroundColor: 'white',
    borderRadius: 2,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    width: itemWidth,
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  criteriaBox: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 100,
    backgroundColor: '#d0cdcd',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  criteriaShortcut: {
    color: '#787878',
    fontSize: 30,
    fontWeight: 'bold',
  },
  detailContainer: {
    paddingLeft: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  indicatorImage: {
    width: '99%',
    height: '99%',
    borderWidth: 0,
    borderColor: 'transparent'
  }
});

export default CriteriaSelection;
