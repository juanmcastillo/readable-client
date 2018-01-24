import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CategoriesMenu from './CategoriesMenu';
import PostList from '../posts/PostList';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import { setPosts } from '../../actions/Posts';

class CategoryViewComponent extends React.Component {

    state = {
        openSideMenu: false
    }

    toggleSideMenu = () => this.setState({openSideMenu: !this.state.openSideMenu})

    render(){
        const { posts, updatePosts } = this.props;
        
        return (
            <div>
                <AppBar title="Categories"
                        onLeftIconButtonClick={this.toggleSideMenu}
                        iconElementRight={( 
                            <IconMenu iconButtonElement={
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                      }
                                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                                <MenuItem primaryText="Order by Votes"
                                          onClick={() => {
                                            posts.sort(sortBy('voteScore'));
                                            updatePosts(posts);
                                          }} />
                                <MenuItem primaryText="Order by Timestamp"
                                          onClick={() => {
                                            posts.sort(sortBy('timestamp'));
                                            updatePosts(posts);
                                          }} />
                            </IconMenu>)} />
                
                <PostList />

                <CategoriesMenu toggleSideMenu={this.toggleSideMenu}
                                openSideMenu={this.state.openSideMenu} />

                <FloatingActionButton className='floating-btn-bottom'>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    posts: state.posts.posts
});

const mapDispatchToProps = (dispatch) => ({
    updatePosts: (posts) => dispatch(setPosts(posts))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryViewComponent);