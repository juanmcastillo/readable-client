import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import CategoryViewComponent from './components/categories/CategoryView';
import { getCategories } from './actions/Categories';
import { getPosts } from './actions/Posts';

class App extends Component {

  componentDidMount(){
    this.props.fetchCategories();

    this.props.fetchPosts();
  }

  render() {
    
    return (
        <div className='app'>
          <Switch>

            <Route exact path='/' render={() => (
              <CategoryViewComponent />
            )}/>

            <Route exact path='/:category' render={() => (
              <CategoryViewComponent />)}/>

            <Route render={() => (<h1>not found!</h1>)}/>
            
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => getCategories(dispatch),
  fetchPosts: () => getPosts(dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
