import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.scss';

class App extends Component {
  render() {
    return (
      <div className={classes.container}>
        <header className={classes.header}>
          <img src={logo} className={classes.logo} alt="logo" />
          <h1 className={classes.title}>Welcome to React</h1>
        </header>
        <p className={classes.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
