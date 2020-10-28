const getPickerFormat = (items) => {
  let data = [];
  items.map((item) => {
    let itemObj = {value: item};
    if (item === 'km')
      itemObj['label'] = 'ខ្មែរ';
    else if (item === 'en')
      itemObj['label'] = 'English';

    data.push(itemObj);
  });

  return data;
}

const getPickerFormatFromObject = (items) => {
  let data = [];
  items.map((item) => {
    const itemObj = {
      value: item.code,
      label: item.name,
    };

    data.push(itemObj);
  });

  return data;
}

const getPickerDefaultValue = (value) => {
  if (value != '' && value != undefined)
    return value.toString();

  return null;
};


export {getPickerFormat, getPickerFormatFromObject, getPickerDefaultValue};