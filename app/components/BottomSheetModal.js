import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
// import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const BottomSheet = (props, ref) => {
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => ref.current.dismiss()}
      />
    ),
    [],
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        snapPoints={props.snapPoints}
        onDismiss={() => !!props.onDismiss && props.onDismiss()}
        onChange={(index) => !!props.onChange && props.onChange(index)}
      >
        <BottomSheetScrollView style={styles.contentContainer}>
          { props.content }
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
});

export default  React.forwardRef(BottomSheet);