import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LocalizationContext } from './Translations';
import { FontFamily } from '../assets/stylesheets/theme/font';
import Color from '../themes/color';

const ModalViewMoreButton = (props) => {
  const { translations } = useContext(LocalizationContext);

  const expandModal = () => {
    props.updateIsExpanded();
    setTimeout(() => {
      props.modalRef.current?.expand();
    }, 100);
  }

  return (
    <TouchableOpacity onPress={() => expandModal()} style={{marginBottom: 20, marginTop: -15, alignSelf: 'flex-end', flexDirection: 'row'}}>
      <Text style={{color: Color.clickableColor, fontFamily: FontFamily.title, fontSize: 16, textTransform: 'capitalize'}}>
        {translations.viewMore}
        </Text>
      <Icon name="expand-more" color={Color.clickableColor} size={26} />
    </TouchableOpacity>
  ) 
}

export default ModalViewMoreButton;