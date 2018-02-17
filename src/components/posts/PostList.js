import React from 'react';
import ShortId from 'shortid';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import ActionHome from 'material-ui/svg-icons/communication/forum';
import ListItemIconMenu from '../shared/ListItemIconMenu';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { deletePost, voteForPost } from '../../actions/posts/Posts';

function PostList({ posts, selectedCategory, history, deletePost, upVote, downVote }){
    const filteredPosts = selectedCategory ? posts.filter(post => post.category === selectedCategory.name)
                                           : posts;  
    return (
        <List>
        {
            filteredPosts && filteredPosts.length > 0 ? filteredPosts.map(post => (

                <div key={ShortId.generate()}>

                    <ListItem primaryText={post.title}
                              onClick={() => history.push(`${post.category}/${post.id}`)}
                              secondaryText={
                                <div>
                                    {post.author ? `by ${post.author}` : ''} | 
                                    {post.timestamp ?  ` ${new Date(post.timestamp).toDateString()}` : ''} |
                                    {post.voteScore ? ` ${post.voteScore}` : ''}
                                </div>
                              }
                              leftIcon={(<ActionHome />)}
                              rightIconButton={ListItemIconMenu({actions: [
                                { 
                                    name:'Delete',
                                    execute: () => deletePost(post)
                                },
                                { 
                                    name:'Edit',
                                    execute: () => history.push(`${post.category}/${post.id}/edit`)
                                },
                                { 
                                    name:'Upvote',
                                    execute: () => upVote(post)
                                },
                                { 
                                    name:'Downvote',
                                    execute: () => downVote(post)
                                }
                            ]})} />

                    <Divider />

                </div>
            ))
            : <h2 className="padded-text">No Posts Available</h2>
        }
        </List>
    );

}

PostList.propTypes = {
    selectedCategory: PropTypes.object,
    posts: PropTypes.array,
    deletePost: PropTypes.func.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
    selectedCategory: state.categories.selectedCategory,
    posts: state.posts.posts
});

const mapDispatchToProps = (dispatch) => ({
    deletePost: (postId) => dispatch(deletePost(postId)),
    upVote: (post) => dispatch(voteForPost(post, 'upVote')),
    downVote: (post) => dispatch(voteForPost(post, 'downVote'))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);