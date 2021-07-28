import React, { Component } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

import Color from '../../themes/color';
import uuidv4 from '../../utils/uuidv4';

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accordionStatuses: new Array(props.items.length)
    }
  }

  toggleAccordion(index) {
    let statuses = this.state.accordionStatuses;
    statuses[index] = !statuses[index];

    this.setState({
      accordionStatuses: statuses
    })
  }

  renderAccordion() {
    return this.props.items.map((item, index) => {
      return (
        <List.Accordion
          key={uuidv4()}
          title={this.props.accordionTitle(item)}
          style={{ backgroundColor: Color.whiteColor, borderBottomWidth: 1, borderColor: '#ebebeb' }}
          onPress={() => this.toggleAccordion(index)}
          expanded={this.state.accordionStatuses[index]}
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