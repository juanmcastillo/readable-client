import React from 'react';
import ShortId from 'shortid';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import ActionHome from 'material-ui/svg-icons/communication/forum';

function PostList({ posts }){
    return (
        <List>
        {
            posts.map(post => (
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
        }
        </List>
    );

}

export default PostList;