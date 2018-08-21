import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Editor
class ColumnCheckbox extends React.Component {
  static propTypes = {
    value: PropTypes.bool,
    onUpdate: PropTypes.func.isRequired
  }
  static defaultProps = {
    value: true
  }
  getValue() {
    return parseInt(this.range.value, 10);
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return [
      <input
        { ...rest }
        type="checkbox"
        value={value}
      />
    ];
  }
}

export default ColumnCheckbox;