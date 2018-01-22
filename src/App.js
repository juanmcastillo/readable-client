import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        
        <Switch>

          <Route exact path='/' render={() => (<h1>hello, world</h1>)}/>

          <Route render={() => (<h1>not found!</h1>)}/>

        </Switch>

      </div>
    );
  }
}

function mapStateToProps({ }){
  return {

  };
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
