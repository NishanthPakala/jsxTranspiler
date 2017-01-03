import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(){
      super();
      this.state = {
        input: "Enter your JSX here",
        output: '',
        err: ''
      }
    }
    update(e){
  let code = e.target.value;
  try {
    this.setState({
      output: window.Babel
      .transform(code, { presets: ['es2015', 'react']})
      .code,
      err: ''
    })
  }
  catch(err){
    this.setState({err: err.message})
  }
}
    render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to JSX Transpiler with React</h2>
        </div>
        <header> {this.state.err} </header>
        <div className="container">
        <textarea
        onChange={this.update.bind(this)}
        defaultValue={this.state.input}>
        </textarea>
        <pre>{this.state.output}</pre>
        </div>
      </div>
    );
  }
}

export default App;
