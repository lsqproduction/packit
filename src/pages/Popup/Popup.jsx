import React from 'react';
import logo from '../../assets/img/logo128.png';
import Greetings from '../../containers/Greetings/Greetings';
import Login from '../../containers/Login';
import Card from '../../containers/Card';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to Techpacker!</p>
        {/*<Greetings />*/}
        <p>Set default values here</p>
        <Card />
        {/* <Login /> */}
        {/* <button className="button">SIGN IN</button>
        <button className="button_signup">SIGN UP</button> */}
      </header>
    </div>
  );
};

export default Popup;
