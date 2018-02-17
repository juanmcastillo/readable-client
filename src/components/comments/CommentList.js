import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ShortId from 'shortid';
import CommentComposer from '../../components/comments/CommentComposer';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { deleteComment, voteOnComment, getCommentsForPost } from '../../actions/comments/Comments';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';

class CommentsList extends React.Component {

  componentDidMount(){
    this.props.getComments(this.props.postId);
  }

  render(){

    const { comments, deleteComment, voteOnComment } = this.props;

    return (
        <Paper>

            <h1 className="padded-text">Comments</h1>

            <List>
            {
              comments && comments.length > 0 ? 
                comments.map(comment => (

                  <div key={ShortId.generate()}>

                    <Divider />

                    <ListItem key={ShortId.generate()} children={        

                                <Card key={ShortId.generate()}>

                                  <CardHeader />

                                  <CardTitle title={`${comment ? comment.author : 'Anonymous'} says:`} 
                                             subtitle={`Score: ${comment.voteScore}`} />

                                  <CardText>
                                  {
                                    comment.body
                                  }
                                  </CardText>

                                  <CardActions>

                                    <CommentComposer comment={comment}/>
        
                                    <IconButton tooltip="Delete">

                                      <ActionDelete onClick={() => deleteComment(comment)}/>

                                    </IconButton>
                                    
                                    <IconButton tooltip="Upvote">

                                      <ThumbUp onClick={() => voteOnComment(comment, "upVote")}/>

                                    </IconButton>
                                    
                                    <IconButton tooltip="Downvote">

                                      <ThumbDown onClick={() => voteOnComment(comment, "downVote")}/>

                                    </IconButton>

                                  </CardActions>

                                </Card>}/>

                    </div>
                  ))
                : <h3 className="padded-text">No comments yet</h3>
            }
            </List>

        </Paper>
    );
  }
}

CommentsList.propTypes = {
  comments: PropTypes.array,
  getComments: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  voteOnComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  comments: state.comments ? state.comments[props.postId] : []
});

const mapDispatchToProps = (dispatch) => ({
  getComments: (postId) => dispatch(getCommentsForPost(postId)),
  deleteComment: (comment) => dispatch(deleteComment(comment)),
  voteOnComment: (comment, option) => dispatch(voteOnComment(comment, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);