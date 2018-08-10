import React, { Component } from 'react';
import NewsList from './features/news_item'

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>News</h1>
        <NewsList />
      </div>
    );
  }
}

export default App;
