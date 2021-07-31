import './BlogCard.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import PropsTypes from 'prop-types';

export const BlogCard = ({
  title,
  description,
  liked,
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
  isLoggedIn,
}) => {
  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  };

  const heartFill = liked ? 'crimson' : 'darkslategrey';

  return (
    <div className="post">
      <div className="postContent">
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      {isLoggedIn && (
        <div className="postControl">
          <button className="editBtn" onClick={showEditForm}>
            <EditIcon />
          </button>
          <button className="deleteBtn" onClick={deletePost}>
            <DeleteForeverIcon />
          </button>
        </div>
      )}
    </div>
  );
};

BlogCard.propTypes = {
  title: PropsTypes.string,
  description: PropsTypes.string,
  liked: PropsTypes.bool,
  likePost: PropsTypes.func,
  deletePost: PropsTypes.func,
  handleEditFormShow: PropsTypes.func,
  handleSelectPost: PropsTypes.func,
};
