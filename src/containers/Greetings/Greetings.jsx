import React, { Component } from 'react';

class GreetingComponent extends Component {
  componentDidMount() {
    console.log(sessionStorage);
  }

  render() {
    return (
      <div>
        <p>Hello, {localStorage.fullName}!</p>
      </div>
    );
  }
}

export default GreetingComponent;
