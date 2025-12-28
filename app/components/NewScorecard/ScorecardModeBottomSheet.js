import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import BottomSheetModal from '../BottomSheetModal';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';

const ScorecardModeBottomSheet = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [isOffline, setIsOffline] = useState(true);

  const onSelect = (value) => {
    setIsOffline(value);
  }

  const radioButton = ({ label, value, isSelected, onPress }) => {
    return (
      <TouchableOpacity onPress={() => onPress(value)} style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0, paddingVertical: 6}}>
        <View style={{minHeight: 48, justifyContent: 'center', paddingRight: 12}}>
          <RadioButton
            value={value}
            status={ isSelected ? 'checked' : 'unchecked' }
            style={{paddingLeft: 0}}
            onPress={() => onPress(value)}
          />
        </View>
        <Text style={{flexShrink: 1, fontFamily: FontFamily.body}}>{label}</Text>
      </TouchableOpacity>
    )
  }

  const renderContent = () => {
    return (
      <View>
        <BottomSheetModalTitle title={translations.implementationMethod} />
        <View style={{padding: containerPadding}}>
          <Text style={{fontFamily: FontFamily.body, fontSize: bodyFontSize(), marginBottom: 8}}>
            { translations.pleaseChooseImplementationMethod }
          </Text>

          <RadioButton.Group value={null}>
            { 
              radioButton({
                label: translations.offlineMode,
                value: true,
                onPress: (value) => onSelect(value),
                selectedValue: isOffline,
                isSelected: isOffline
              })
            }
            {
              radioButton({
                label: translations.onlineMode,
                value: false,
                onPress: (value) => onSelect(value),
                selectedValue: isOffline,
                isSelected: !isOffline
              })
            }
          </RadioButton.Group>

          <FormBottomSheetButton
            isValid={true}
            label={translations.continue}
            wrapperStyle={{marginTop: 16}}
            save={() => {}}
          />
        </View>
      </View>
    );
  }

  return (
    <BottomSheetModal
      ref={props.scorecardModeModalRef}
      content={renderContent()}
      // snapPoints={this.state.snapPoints}
      // onDismiss={() => this.setState({ isExpanded: false })}
      // onChange={(index) => this.onChangeModal(index)}
    />
  );
}

export default ScorecardModeBottomSheet;