import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import * as ReadableApi from './utils/ReadableApi';
import CategoryViewComponent from './components/categories/CategoryView';
import sortBy from 'sort-by';
// import * as CategoryActions from './actions/Categories';
import { getCategories } from './actions/Categories'

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount(){
    this.props.fetchCategories();

    ReadableApi.getAllPosts()
               .then((posts) => this.setState({
                posts
              }));
  }

  sortPostsBy = (parameter) => {
    this.setState({
      posts: this.state.posts.sort(sortBy(parameter))
    });
  }

  render() {
    
    return (
        <div className='app'>
          <Switch>

            <Route exact path='/' render={() => (
              <CategoryViewComponent posts={this.state.posts}
                                     sortPostsBy={this.sortPostsBy}/>
            )}/>

            <Route exact path='/:category' render={() => (<h1>holis</h1>)}/>

            <Route render={() => (<h1>not found!</h1>)}/>
            
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => getCategories(dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
