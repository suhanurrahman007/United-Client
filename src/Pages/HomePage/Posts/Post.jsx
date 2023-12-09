import img from "../../../assets/Login/placeholder.jpg"
import { GiVote } from "react-icons/gi";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import useComments from "../../../hooks/useComments";
const Post = ({ post }) => {
  // console.log(post);
  const total = post.upVote - post.downVote;
  // console.log(total);

  const [comments] = useComments();

  const filterComment = comments.filter(
    (comment) => comment?.title === post?.title
  );

  return (
    <Link to={`/posts/${post?._id}`}>
      <div className="hero">
        <div className="hero-content">
          <img
            src={post?.image ? post?.image : img}
            className="w-28 rounded-lg shadow-2xl"
          />
          <div className="space-y-3">
            <div className="badge badge-accent badge-outline">{post?.tag}</div>
            <h1 className="text-xl font-bold">{post?.title}</h1>
            <div className="flex justify-between gap-5">
              <div className="badge badge-success badge-outline gap-2">
                <GiVote></GiVote>
                Vote <span className="text-orange-900 font-bold">{total}</span>
              </div>
              <div className="badge badge-success badge-outline gap-2">
                <FaCommentDots></FaCommentDots>
                Comments{" "}
                <span className="text-orange-900 font-bold">
                  {filterComment?.length}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400">{post?.time}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;