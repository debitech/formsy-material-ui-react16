import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { withFormsy } from 'formsy-react';
import AutoComplete from 'material-ui/AutoComplete';

import FormsyComponent from './FormsyComponent';

export class FormsyAutoComplete extends FormsyComponent {
  static propTypes = {
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.any,
  };

  state = {
    value: this.props.defaultValue || this.props.value || '',
  };

  componentWillMount() {
    this.props.setValue(this.props.defaultValue || this.props.value || '');
  }

  handleBlur = event => {
    this.props.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  };

  handleChange = event => {
    this.setState({
      value: event.currentTarget.value,
    });
    if (this.props.onChange) this.props.onChange(event);
  };

  handleUpdateInput = value => {
    this.setState({
      value,
    });
    if (this.props.onChange) this.props.onChange(null, value);
  };

  handleKeyDown = event => {
    if (keycode(event) === 'enter') this.props.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  };

  render() {
    const {
      defaultValue, // eslint-disable-line no-unused-vars
      onFocus,
      value, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      isFormDisabled,
      getErrorMessage,
      ...rest
    } = this.props;

    return (
      <AutoComplete
        disabled={isFormDisabled()}
        {...rest}
        errorText={getErrorMessage()}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onUpdateInput={this.handleUpdateInput}
        onFocus={onFocus}
        onKeyDown={this.handleKeyDown}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.state.value}
      />
    );
  }
}

export default withFormsy(FormsyAutoComplete);
