import { Link } from "react-router-dom";
import type { Comment, User } from "../../entities/types";

type CommentCardProps = {
  comment: Comment;
  viewer?: User;
};

export function CommentCard({ comment, viewer }: CommentCardProps) {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/profiles/${comment.author.username}`}
          className="comment-author"
        >
          <img src={comment.author.image} className="comment-author-img" />
        </Link>
        &nbsp;
        <Link
          to={`/profiles/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(comment.createdAt))}
        </span>
        {viewer?.username === comment.author.username && (
          <span className="mod-options">
            <i className="ion-edit" />
            <i className="ion-trash-a" />
          </span>
        )}
      </div>
    </div>
  );
}
