import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import CommentList from '../comments/CommentList';
import CommentComposer from '../comments/CommentComposer';
import { connect } from 'react-redux';
import { deletePost, voteForPost, getPostById } from '../../actions/posts/Posts';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';

class PostViewer extends React.Component {

  componentDidMount(){
    this.props.getPost(this.props.match.params.id);
  }

  render(){
    const {post, history, match, deletePost, upVote, downVote} = this.props;

    return (
      <div>

          <Card>
            <CardHeader />
            <CardTitle title={post.title} subtitle={`by ${post.author} | score: ${post.voteScore}`} />

            <CardText>
            {
              post.body 
            }
            </CardText>

            <CardActions>

              <IconButton tooltip="Edit">

                <ContentCreate onClick={() => history.push(`/${post.category}/${post.id}/edit`)}/>

              </IconButton>

              <IconButton tooltip="Delete">

                <ActionDelete onClick={() => {
                  deletePost(post);
                  history.push('/');
                }}/>

              </IconButton>

              <CommentComposer postId={this.props.match.params.id}/>

              <IconButton tooltip="Upvote">

                <ThumbUp onClick={() => upVote(post)}/>
                
              </IconButton>
              
              <IconButton tooltip="Downvote">

                <ThumbDown onClick={() => downVote(post)}/>

              </IconButton>

            </CardActions>

          </Card>

          <CommentList postId={match.params.id} />
      </div>
    );
  }
}

PostViewer.propTypes = {
  post: PropTypes.object,
  deletePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => ({
  post: state.posts.posts ? state.posts.posts.find(p => p.id === props.match.params.id) : {}
});

const mapDispatchToProps = (dispatch) => ({
  deletePost: (post) => dispatch(deletePost(post)),
  getPost: (postId) => dispatch(getPostById(postId)),
  upVote: (post) => dispatch(voteForPost(post, 'upVote')),
  downVote: (post) => dispatch(voteForPost(post, 'downVote'))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostViewer);