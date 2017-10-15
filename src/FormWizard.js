import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { validateForm } from './helper';

class FormWizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      email: '',
      phone: '',
      touched: {
        address: false,
        email: false,
        phone: false
      }
    };

    this.onChange = (address) => this.setState({ address });
  }

  /**
   * POST method for submit data
   */
  handleFetch() {
    return fetch('/endpoint/', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city: this.state.address,
        email: this.state.email,
        phone: this.state.phone
      })
    });
  }

  /**
   * Set the email value
   */
  handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  }
  
  /**
   * Set the phone value
   */
  handlePhoneChange = (evt) => {
    this.setState({ phone: evt.target.value });
  }

  /**
   * Returns true when a field has been touched
   */
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  handleFormSubmit = (event) => {
    if (!this.canBeSubmitted()) {
      event.preventDefault();
      return;
    }

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));

    this.handleFetch();
  }

  canBeSubmitted() {
    const errors = validateForm(this.state.address, this.state.email, this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validateForm(this.state.address, this.state.email, this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      
      return hasError ? shouldShow : false;
    };

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    };

    return (
      <div>
        <h1>Application Wizard</h1>
        <form onSubmit={ this.handleFormSubmit }>
          <div 
            className={ shouldMarkError('address') ? "has-error form-group" : "form-group" }
          >
            <label htmlFor="userCity">City</label>
            <PlacesAutocomplete inputProps={ inputProps } />
          </div>
          <div 
            className={ shouldMarkError('email') ? "has-error form-group" : "form-group" }
          >
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              onChange={this.handleEmailChange}
              onBlur={this.handleBlur('email')}
            />
          </div>
          <div 
            className={ shouldMarkError('phone') ? "has-error form-group" : "form-group" }
          >
            <label htmlFor="phoneNumber">Mobile phone number</label>
            <input
              className="form-control"
              type="text"
              name="telephone"
              onChange={this.handlePhoneChange}
              onBlur={this.handleBlur('phone')}
            />
          </div>
          <button
            className="btn btn-primary"
            disabled={ isDisabled }
            type="submit"
          >
            Confirm
          </button>
        </form>
      </div>
    )
  }
}

export default FormWizard;
