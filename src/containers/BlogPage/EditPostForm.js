import './EditPostForm.css';
import CancelIcon from '@material-ui/icons/Cancel';
import { Component } from 'react';

export class EditPostForm extends Component {
  state = {
    postTitle: this.props.selectedPost.title,
    postDesc: this.props.selectedPost.description,
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

  savePost = (event) => {
    event.preventDefault();
    const post = {
      id: this.props.selectedPost.id,
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: this.props.selectedPost.liked,
    };

    this.props.editBlogPost(post);
    this.props.handleEditFormHide();
  };

  handleEscape = (event) => {
    if (event.key === 'Escape') {
      this.props.handleEditFormHide();
    }
  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }

  render() {
    const handleEditFormHide = this.props.handleEditFormHide;
    return (
      <>
        <form className="editPostForm" onSubmit={this.savePost}>
          <button className="hideBtn" onClick={handleEditFormHide}>
            <CancelIcon />
          </button>
          <h2>Edit Post</h2>
          <div>
            <input
              className="editFormInput"
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
              className="editFormInput"
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
              Save
            </button>
          </div>
        </form>
        <div onClick={handleEditFormHide} className="overlay"></div>
      </>
    );
  }
}
