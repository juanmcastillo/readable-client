import React from 'react';
import ShortId from 'shortid';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import ActionHome from 'material-ui/svg-icons/communication/forum';
import { connect } from 'react-redux';
import { selectCategory } from '../../actions/Categories';

function PostList({ posts, selectedCategory }){
    const filteredPosts = selectedCategory ? posts.filter(post => post.category === selectCategory.name)
                                           : posts;
    return (
        <List>
        {
            filteredPosts && filteredPosts.length > 0 ? filteredPosts.map(post => (
                <div key={ShortId.generate()}>
                    <ListItem primaryText={post.title}
                              secondaryText={
                                <div>
                                    {post.author ? `by ${post.author}` : ''} | 
                                    {post.timestamp ?  ` ${new Date(post.timestamp).toDateString()}` : ''} |
                                    {post.voteScore ? ` ${post.voteScore}` : ''}
                                </div>
                              }
                              leftIcon={(<ActionHome />)}>
                    </ListItem>
                    <Divider />
                </div>
            ))
            :
            <h1>No Posts Available</h1>
        }
        </List>
    );

}

const mapStateToProps = (state, props) => ({
    selectedCategory: state.categories.selectedCategory,
    posts: state.posts.posts
});

export default connect(mapStateToProps)(PostList);