import React, { useCallback, useState } from 'react'
import { StyleSheet, Keyboard } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const {useImperativeHandle} = React

const DynamicHeightBottomSheetModal = (props, ref) => {
  const modalRef = React.useRef()
  const [content, setContent] = useState(null)

  const present = () => {
    Keyboard.dismiss()
    modalRef.current?.present()
  }

  const dismiss = () => {
    modalRef.current?.dismiss()
  }

  const expand = () => {
    modalRef.current?.expand()
  }

  const collapse = () => {
    modalRef.current?.collapse()
  }

  useImperativeHandle(ref, () => ({
    setContent,
    present,
    dismiss,
    expand,
    collapse
  }))

  const renderBackdrop = useCallback( props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ), []);

  return (
    <BottomSheetModal
      ref={modalRef}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{backgroundColor: '#ffffff'}}
      onDismiss={() => !!props.onDismiss && props.onDismiss()}
      onChange={(index) => !!props.onChange && props.onChange(index)}
      enableDynamicSizing
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        { content }
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
};

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    flexGrow: 1,
  },
});

export default  React.forwardRef(DynamicHeightBottomSheetModal);
