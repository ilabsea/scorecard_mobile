import React, { Component } from 'react';

import { LocalizationContext } from '../Translations';
import TextFieldInput from '../TextFieldInput';
import Autocomplete from './Autocomplete';
import indicatorHelper from '../../helpers/indicator_helper';

class AddNewIndicatorModalTextInputs extends Component {
  static contextType = LocalizationContext;
  // constructor(props) {
  //   super(props);
  //   this.tags = indicatorHelper.getTags(this.props.scorecardUuid);
  // }

  async componentDidMount() {
    this.tags = await indicatorHelper.getTags(this.props.scorecardUuid);
  }

  _filterData = (query) => {
    if (query === '') {
      return [];
    }

    let PATTERN = new RegExp(`${query.trim()}`, 'i');
    return this.tags.filter(str => PATTERN.test(str));
  }

  renderIndicatorTagInput() {
    if (this.props.isUniqueIndicatorOrEditing) {
      const data = this._filterData(this.props.tag);

      return <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              label={this.context.translations['enterTag']}
              data={data}
              value={this.props.tag}
              defaultValue={this.props.tag}
              onChangeText={(text) => this.props.onChangeTag(text)}
              style={{marginBottom: 24}}
            />
    }
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <TextFieldInput
          value={this.props.name}
          isRequire={true}
          label={translations.indicatorName}
          placeholder={translations.enterIndicatorName}
          fieldName="indicatorName"
          onChangeText={(fieldName, text) => this.props.onChangeName(text)}
          message={this.props.isIndicatorExist ? translations.thisIndicatorIsAlreadyExist : ''}
        />

        { this.renderIndicatorTagInput() }
      </React.Fragment>
    )
  }
}

export default AddNewIndicatorModalTextInputs;