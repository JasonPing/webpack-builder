'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import '../../common';
import './search.less';
import { a } from './tree-shaking.js';
import largeNumber from 'large-number-module-jason';
import logo from './image/logo.png';

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

ReactDOM.render(<Search />, document.getElementById('root'));
