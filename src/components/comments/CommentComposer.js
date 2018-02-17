import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import ShortId from 'shortid';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { connect } from 'react-redux';
import { saveComment, sendCommentUpdate } from '../../actions/comments/Comments';

class CommentComposer extends React.Component {
    
    state = {
        author:'',
        comment: '',
        open: false
    };
    
    toggleDialog = () => {
        const { comment } = this.props;

        this.setState({
            open: !this.state.open,
            author: comment? comment.author : '',
            comment: comment? comment.body : ''
        });
    };

    handleChangeFor = (value, field) => {
        this.setState({
            [field]: value
        });
    }

    render(){
        const { saveNewComment, sendCommentUpdate, postId, comment } = this.props;

        const actions = [
            <FlatButton label="Cancel"
                        primary={true}
                        onClick={this.toggleDialog} />,

            <FlatButton label="Save"
                        primary={true}
                        disabled={!this.state.title && !this.state.comment}
                        onClick={() => {
                            const newComment = {
                                id: comment ? comment.id : ShortId.generate(),
                                author: this.state.author,
                                body: this.state.comment,
                                timestamp: comment ? comment.timestamp : new Date().getTime(),
                                parentId: comment ? comment.parentId : postId
                            };
                            
                            if(comment){
                                sendCommentUpdate(newComment);
                            }else{
                                saveNewComment(newComment);
                            }
                            this.toggleDialog()
                        }} />,
          ];
      
          return (
            
              <IconButton tooltip="Add Comment">

                {
                    comment ? <ContentCreate onClick={() => {this.toggleDialog()}} /> 
                            : <NoteAdd onClick={this.toggleDialog}/>
                }
                

                <Dialog title="Comment Composer"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.toggleDialog}>

                    <TextField floatingLabelText="Author"
                               value={this.state.author}
                               fullWidth={true}
                               onChange={(e) => this.handleChangeFor(e.target.value, "author")}/><br/>

                    <TextField floatingLabelText="Comment"
                               multiLine={true}
                               rows={5}
                               rowsMax={7}
                               fullWidth={true}
                               value={this.state.comment}
                               onChange={(e) => this.handleChangeFor(e.target.value, "comment")}/><br/>
                
                </Dialog>

              </IconButton>

            );
    }
}

CommentComposer.propTypes = {
    saveNewComment: PropTypes.func.isRequired,
    sendCommentUpdate: PropTypes.func.isRequired,
    postId: PropTypes.string,
    comment: PropTypes.object
}

const mapStateToProps = (state, props) => ({});
  
const mapDispatchToProps = (dispatch) => ({
    saveNewComment: (comment) => dispatch(saveComment(comment)),
    sendCommentUpdate: (comment) => dispatch(sendCommentUpdate(comment))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CommentComposer);