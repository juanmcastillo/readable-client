import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import * as ReadableApi from './utils/ReadableApi';
import CategoryViewComponent from './components/categories/CategoryView';
import sortBy from 'sort-by';

class App extends Component {

  state = {
    categories: [],
    posts: []
  }

  componentDidMount(){
    ReadableApi.getAllCategories()
               .then((categories) => this.setState({
                 categories
               }));

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
              <CategoryViewComponent categories={this.state.categories}
                                     posts={this.state.posts}
                                     sortPostsBy={this.sortPostsBy}/>
            )}/>

            <Route exact path='/:category' render={() => (<h1>holis</h1>)}/>

            <Route render={() => (<h1>not found!</h1>)}/>
            
          </Switch>
        </div>
    );
  }
}

export default withRouter(connect()(App));
