import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PostList from '../posts/PostList';
import ListItemIconMenu from '../shared/ListItemIconMenu';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPosts } from '../../actions/posts/Posts';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

function CategoryView ({posts, updatePosts, history}) {

    const actions = [
        {
            name: 'Order by Votes',
            execute: () =>{
                posts.sort(sortBy('voteScore'));
                updatePosts(posts);
            }
        },
        {
            name: 'Order by Timestamp',
            execute: () =>{
                posts.sort(sortBy('timestamp'));
                updatePosts(posts);
            }
        }
    ];

    return (
        <div className="category-view">    
            
            <Toolbar>

                <ToolbarGroup firstChild={true}>
                
                </ToolbarGroup>

                <ToolbarGroup>

                    <ToolbarTitle text="Sorting"/>

                    <ListItemIconMenu actions={actions}/>

                </ToolbarGroup>

            </Toolbar>

            <PostList history={history}/>

            <FloatingActionButton className="floating-btn-bottom"
                                  onClick={() => history.push("/posts/create")}>

                <ContentAdd />  

            </FloatingActionButton>

        </div>
    );
}

CategoryView.propTypes = {
    history: PropTypes.object.isRequired,
    posts: PropTypes.array,
    updatePosts: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
    posts: state.posts.posts
});

const mapDispatchToProps = (dispatch) => ({
    updatePosts: (posts) => dispatch(setPosts(posts))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);