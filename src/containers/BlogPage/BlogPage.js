import axios from 'axios';
import { Component } from 'react';
import './BlogPage.css';
import { AddPostForm } from './AddPostForm';
import { BlogCard } from './BlogCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { EditPostForm } from './EditPostForm';
import { postsUrl } from '../../constants/projectData';

let source;

export class BlogPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddForm: false,
      showEditForm: false,
      blogArr: [],
      isPending: false,
      selectedPost: {},
    };
  }

  fetchPosts = () => {
    source = axios.CancelToken.source();
    axios
      .get(postsUrl, { cancelToken: source.token })
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchPosts();
  }

  componentWillUnmount() {
    if (source) {
      source.cancel('Axios get canceled');
    }
  }

  likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(`${postsUrl}${blogPost.id}`, temp)
      .then((response) => {
        console.log('Post edited => ', response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Delete ${blogPost.title}?`)) {
      this.setState({
        isPending: true,
      });
      axios
        .delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          console.log('Post deleted => ', response.data);
          this.fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true,
    });
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log('Created post =>', response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editBlogPost = (updatedBlogPost) => {
    this.setState({
      isPending: true,
    });
    axios
      .put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        console.log('Post edited =>', response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAddFormShow = () => {
    this.setState({
      showAddForm: true,
    });
  };

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false,
    });
  };

  handleEditFormShow = () => {
    this.setState({
      showEditForm: true,
    });
  };

  handleEditFormHide = () => {
    this.setState({
      showEditForm: false,
    });
  };

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost,
    });
  };

  render() {
    const blogPosts = this.state.blogArr.map((item) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          handleEditFormShow={this.handleEditFormShow}
          handleSelectPost={() => this.handleSelectPost(item)}
          isLoggedIn={this.props.isLoggedIn}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Loading...</h1>;

    const postsOpactiy = this.state.isPending ? 0.5 : 1;

    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

        {this.state.showEditForm && (
          <EditPostForm
            handleEditFormHide={this.handleEditFormHide}
            selectedPost={this.state.selectedPost}
            editBlogPost={this.editBlogPost}
          />
        )}

        <>
          <h1>Ami's Blog</h1>
          {this.props.isLoggedIn && (
            <div className="addNewPost">
              <button className="blackBtn" onClick={this.handleAddFormShow}>
                Create new post
              </button>
            </div>
          )}

          <div className="posts" style={{ opacity: postsOpactiy }}>
            {blogPosts}
          </div>
          {this.state.isPending && <CircularProgress className="preloader" />}
        </>
      </div>
    );
  }
}
