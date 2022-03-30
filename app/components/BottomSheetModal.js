import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import Color from '../themes/color';

const BottomSheet = (props, ref) => {
  const renderBackdrop = useCallback( props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      onPress={() => ref.current.dismiss()}
    />
  ), []);

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
    backgroundColor: Color.whiteColor,
    width: '100%',
    height: '100%',
  },
});

export default  React.forwardRef(BottomSheet);