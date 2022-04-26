const defaultItemSize = 48;

export const listItemPaddingVertical = 12;

// receive the component padding (vertical or horizontal) as parameter
export const pressableItemSize = (padding = 0) => {
  return defaultItemSize + padding;
}