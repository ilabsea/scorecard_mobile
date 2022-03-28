import React, { Component } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

import Color from '../themes/color';
import uuidv4 from '../utils/uuidv4';

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accordionStatuses: !!props.accordionStatuses ? props.accordionStatuses : new Array(props.items.length),
    }
  }

  toggleAccordion(toggleIndex) {
    let statuses = this.state.accordionStatuses;
    statuses[toggleIndex] = !statuses[toggleIndex];

    if (!!this.props.hasAutoToggle) {
      this.state.accordionStatuses.map((accordionStatus, index) => {
        if (index != toggleIndex)
          statuses[index] = false;
      });
    }

    this.setState({
      accordionStatuses: statuses
    });

    !!this.props.onToggle && this.props.onToggle(toggleIndex);
  }

  renderAccordion() {
    return this.props.items.map((item, index) => {
      return (
        <List.Accordion
          key={uuidv4()}
          title={this.props.accordionTitle(item, index)}
          style={[{ backgroundColor: Color.whiteColor, borderBottomWidth: 1, borderColor: '#ebebeb' }, this.props.customItemStyle]}
          onPress={() => this.toggleAccordion(index)}
          expanded={this.state.accordionStatuses[index]}
          titleStyle={this.props.titleStyle}
        >
          { this.props.accordionContent(item) }
        </List.Accordion>
      )
    });
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <List.Section>
          { this.renderAccordion() }
        </List.Section>
      </View>
    )
  }
}

export default Accordion;