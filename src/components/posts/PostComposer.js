import _ from 'lodash';
import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ShortId from 'shortid';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost, updatePost } from '../../actions/posts/Posts';

class PostComposer extends React.Component {

    state = {
        id: '',
        title: '',
        author: '',
        body: '', 
        category: this.props.selectedCategory && this.props.selectedCategory.name
    }

    componentWillMount() {
        this.setPostData(this.props.post);
    }

    componentWillReceiveProps(nextProps){
        const { post } = nextProps;

        this.setPostData(post);
    }

    setPostData(post){
        if(post !== undefined){
            this.setState({
                id: post.id,
                title: post.title,
                author: post.author,
                body: post.body, 
                category: post.category
            });
        }
    }

    handleChangeFor = (value, field) => {
        this.setState({
            [field]: value
        });
    }

    handlePostUpdateOrCreate(){
        const { post } = this.props;
        
        const postRequest = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
            category: this.state.category,
            id: post ? post.id : ShortId.generate(),
            timestamp: Date.now()
        };

        if(post === undefined){
            this.props.createPost(postRequest)
                      .then(() => this.props.history.goBack());
        }else{
            this.props.updatePost(postRequest)
                      .then(() => this.props.history.goBack());
        }
        
    }

    render(){
        const { categories, history } = this.props; 
    
        return (
            <div>
                <Paper>

                    <div className="post-view">

                        <TextField floatingLabelText="Title"
                                   value={this.state.title}
                                   onChange={(e) => this.handleChangeFor(e.target.value, "title")}/><br/>

                        <TextField floatingLabelText="Author"
                                   value={this.state.author}
                                   onChange={(e) => this.handleChangeFor(e.target.value, "author")}/><br/>
                        
                        <SelectField floatingLabelText="Category"
                                     value={this.state.category}
                                     onChange={(event, index, value) => this.handleChangeFor(value, "category")}
                                     autoWidth={true}>

                        {
                            categories && categories.length > 0 ?
                                categories.map(category => (
                                    <MenuItem key={ShortId.generate()}
                                            value={category.name}
                                            primaryText={`${_.capitalize(category.name) }`}/>
                                ))
                            : <MenuItem></MenuItem>

                        }
                        </SelectField><br/>

                        <TextField floatingLabelText="Content"
                                   multiLine={true}
                                   fullWidth={true}
                                   rows={5}
                                   rowsMax={7}
                                   value={this.state.body}
                                   onChange={(e) => this.handleChangeFor(e.target.value, "body")}/><br/>   
                        
                        <RaisedButton label="Save" 
                                      primary={true}
                                      onClick={() => this.handlePostUpdateOrCreate()}
                                      disabled={!this.state.category} />

                        <RaisedButton label="Cancel" 
                                      onClick={() => history.goBack()} />

                    </div>
                    
                </Paper>

            </div>
        );
    }
}

PostComposer.propTypes = {
    categories: PropTypes.array,
    selectedCategory: PropTypes.object,
    post: PropTypes.object,
    createPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
    categories: state.categories.categories,
    selectedCategory: state.categories.selectedCategory,
    post: state.posts.posts !== undefined ? state.posts.posts.find(p => p.id === props.match.params.id) : undefined
});

const mapDispatchToProps = (dispatch) => ({
    createPost: (post) => dispatch(addPost(post)),
    updatePost: (post) =>dispatch(updatePost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostComposer);
