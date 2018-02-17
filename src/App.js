import React from 'react';
import CategoryView from './components/categories/CategoryView';
import PostComposer from './components/posts/PostComposer';
import PostViewer from './components/posts/PostViewer';
import Header from './components/shared/Header';
import { connect } from 'react-redux';
import { getPosts } from './actions/posts/Posts';
import { getCategories } from './actions/categories/Categories';
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends React.Component {

  componentDidMount(){
    this.props.fetchCategories();

    this.props.fetchPosts();
  }

  render() {
    
    return (
        <div className='app'>

          <Header />

          <Switch>

            <Route exact path='/' component={CategoryView}/>

            <Route exact path='/posts/create' component={PostComposer}/>

            <Route exact path='/:category/:id' component={PostViewer}/>

            <Route exact path='/:category/:id/edit' component={PostComposer}/>

            <Route exact path='/:category' component={CategoryView}/>

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
