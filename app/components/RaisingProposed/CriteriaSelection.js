import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../themes/color';
import realm from '../../db/schema';
import {LocalizationContext} from '../Translations';
import CriteriaAudioButton from './CriteriaAudioButton';
import {getLanguageIndicator} from '../../services/language_indicator_service';

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
      audioIcon: 'play-arrow'
    };
  }

  componentDidMount() {
    this.setState({indicators: this.getIndicator()});
  }

  componentWillUnmount() {
    if (this.audioPlayer != null)
      this.audioPlayer.release();
  }

  iconContainerBackground = (indicator) => {
    return indicator.isSelected ? {backgroundColor: Color.primaryButtonColor} : {};
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
    return indicator.isSelected ? {borderColor: Color.primaryButtonColor, borderWidth: 2} : {};
  }

  updateAudioState = (indicatorId, audioPlayer) => {
    this.setState({playingIndicatorId: indicatorId});
    this.audioPlayer = audioPlayer;
  }

  getIndicatorName = (indicator) => {
    const languageIndicator = getLanguageIndicator(this.props.scorecardUUID, indicator.uuid, 'text');
    return languageIndicator != undefined ? languageIndicator.content : indicator.name.split(":").pop();
  }

  indicatorCard = (indicator, index) => {
    return (
      <View style={[styles.criteriaBoxContainer, this.selectedCriteriaBoxStyle(indicator)]}>
        <TouchableOpacity style={styles.criteriaBox}
          onPress={() => this.selectIndicator(index)}
        >
          <View style={[styles.iconContainer, this.iconContainerBackground(indicator)]}>
            {index != this.state.indicators.length - 1 &&
              <Text style={[styles.criteriaShortcut, this.shortcutColor(indicator)]}>{indicator.shortcut}</Text>
            }
            {index === this.state.indicators.length - 1 && <MaterialIcon name="add" size={50} color={indicator.isSelected ? "#ffffff" : "#787878"} />}
          </View>
          <View style={styles.detailContainer}>
            <Text style={{textAlign: 'left'}}>{this.getIndicatorName(indicator)}</Text>
          </View>
        </TouchableOpacity>
        <CriteriaAudioButton indicator={indicator} audioPlayer={this.audioPlayer}
          playingIndicatorId={this.state.playingIndicatorId}
          updateAudioState={this.updateAudioState}
          scorecardUUID={this.props.scorecardUUID}
        />
      </View>
    )
  }

  renderIndicatorItem = (indicator, index) => {
    if (index === this.state.indicators.length - 1 && this.state.indicators.length%2 != 0) {
      return (
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
          {this.indicatorCard(indicator, index)}
          <View style={{flex: 1, marginHorizontal: 10}} />
        </View>
      )
    }
    return this.indicatorCard(indicator, index);
  }

  getIndicator = () => {
    const {translations} = this.context;
    let indicators = [];
    let predefinedIndicators = JSON.parse(JSON.stringify(realm.objects('Indicator').filtered(`scorecard_uuid = '${this.props.scorecardUUID}'`)));
    const customIndicators = JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`scorecard_uuid = '${this.props.scorecardUUID}'`)));
    const savedIndicators = predefinedIndicators.concat(customIndicators);
    const proposedCriterias = realm.objects('ProposedCriteria').filtered(`scorecard_uuid = '${this.props.scorecardUUID}' AND participant_uuid = '${this.props.participantUUID}'`);
    let selectedIndicators = [];
    savedIndicators.map((indicator) => {
      let attrs = {
        uuid: indicator.id || indicator.uuid,
        name: indicator.name,
        shortcut: indicator.name.split(':')[0],
        isSelected: false,
        tag: indicator.tag,
        type: indicator.id != undefined ? 'predefined' : 'custom',
      };
      if (proposedCriterias != undefined) {
        for (let i=0; i<proposedCriterias.length; i++) {
          const indicatorId = indicator.id != undefined ? indicator.id.toString() : indicator.uuid;
          if (proposedCriterias[i].indicatorable_id === indicatorId) {
            attrs.isSelected = true;
            selectedIndicators.push(attrs);
            break;
          }
        }
      }
      indicators.push(attrs);
    });
    indicators.push({name: translations['addNewCriteria'], uuid: '', shortcut: 'add', isSelected: false, type: 'custom'})
    this.setState({selectedIndicators}, () => {this.props.selectIndicator();});
    return indicators;
  }

  render() {
    return (
      <FlatList
        data={this.state.indicators}
        renderItem={({item, index}) => this.renderIndicatorItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    );
  }
}

const styles = StyleSheet.create({
  criteriaBoxContainer: {
    backgroundColor: 'white',
    borderRadius: 2,
    flexDirection: 'row',
    elevation: 3,
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 10,
    height: 100,
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
});

export default CriteriaSelection;