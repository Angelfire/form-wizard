import React from 'react';
import ReactDOM from 'react-dom';
import FormWizard from './FormWizard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormWizard />, div);
});
