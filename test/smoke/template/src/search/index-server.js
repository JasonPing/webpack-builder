'use strict';

// import React from 'react';
// import '../../common';
// import largeNumber from 'large-number-module-jason';
// import logo from './image/logo.png';

const React = require('react');
const largeNumber = require('large-number-module-jason');
const logo = require('./image/logo.png');
require('./search.less');

class Search extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      Text: null,
    };
  }
  loadComponent() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }
  render() {
    // const funcA = a();
    const { Text } = this.state;
    const addResult = largeNumber('999', '1');
    return (
      <div className="search-text">
        {Text ? <Text /> : null} Search banana haha
        {addResult}
        <img src={logo} onClick={this.loadComponent.bind(this)} />
      </div>
    );
  }
}

module.exports = <Search />;
