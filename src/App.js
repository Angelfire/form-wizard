import React, { Component } from 'react';
import FormWizard from './FormWizard';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <FormWizard />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
