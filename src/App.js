import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : ''
    };
  }
  render() {
    return (
      <div>
          <h1>Hello!! {this.state.name}</h1>
          <button onClick={()=>{this.setState({name:
            'Lyo'});}}>Click Me! </button>
      </div>
    );
  }
}

export default App;
