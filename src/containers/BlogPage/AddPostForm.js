import './AddPostForm.css';
import CancelIcon from '@material-ui/icons/Cancel';
import { Component } from 'react';

export class AddPostForm extends Component {
  state = {
    postTitle: '',
    postDesc: '',
  };

  handlePostTitleChange = (event) => {
    this.setState({
      postTitle: event.target.value,
    });
  };

  handlePostDescChange = (event) => {
    this.setState({
      postDesc: event.target.value,
    });
  };

  createPost = (event) => {
    event.preventDefault();
    const post = {
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: false,
    };

    this.props.addNewBlogPost(post);
    this.props.handleAddFormHide();
  };

  handleEscape = (event) => {
    if (event.key === 'Escape') {
      this.props.handleAddFormHide();
    }
  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }

  render() {
    const handleAddFormHide = this.props.handleAddFormHide;
    return (
      <>
        <form className="addPostForm" onSubmit={this.createPost}>
          <button className="hideBtn" onClick={handleAddFormHide}>
            <CancelIcon />
          </button>
          <h2>Create Post</h2>
          <div>
            <input
              className="addFormInput"
              type="text"
              name="postTitle"
              placeholder="Post's title"
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              className="addFormInput"
              name="postDescription"
              placeholder="Post's description"
              value={this.state.postDesc}
              onChange={this.handlePostDescChange}
              rows={8}
              required
            />
          </div>
          <div>
            <button className="greyBtn" type="submit">
              Add Post
            </button>
          </div>
        </form>
        <div onClick={handleAddFormHide} className="overlay"></div>
      </>
    );
  }
}
