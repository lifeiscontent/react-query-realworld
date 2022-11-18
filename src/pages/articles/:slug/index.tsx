import { Link, useParams } from "react-router-dom";
import { CommentCard, ArticleCommentForm } from "../../../containers";
import {
  useArticleQuery,
  useArticleCommentsQuery,
  useUserQuery,
} from "../../../entities";

export default function ArticlesDetailPage() {
  const { slug } = useParams<"slug">();
  const userQuery = useUserQuery();
  const articleQuery = useArticleQuery(slug!);
  const articleCommentsQuery = useArticleCommentsQuery(slug!);
  if (
    articleQuery.isLoading ||
    articleQuery.isError ||
    userQuery.isLoading ||
    userQuery.isError ||
    articleCommentsQuery.isLoading ||
    articleCommentsQuery.isError
  ) {
    return null;
  }

  const commentForm =
    userQuery.data && "user" in userQuery.data ? (
      <ArticleCommentForm viewer={userQuery.data.user} slug={slug!} />
    ) : (
      <p>
        <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link>{" "}
        to add comments on this article.
      </p>
    );

  const viewer = "user" in userQuery.data ? userQuery.data.user : undefined;

  const comments = articleCommentsQuery.data.comments.map((comment) => (
    <CommentCard comment={comment} viewer={viewer} key={comment.id} />
  ));

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{articleQuery.data.article.title}</h1>

          <div className="article-meta">
            <Link to={`/profiles/${articleQuery.data.article.author.username}`}>
              <img src={articleQuery.data.article.author.image} />
            </Link>
            <div className="info">
              <Link
                to={`/profiles/${articleQuery.data.article.author.username}`}
                className="author"
              >
                {articleQuery.data.article.author.username}
              </Link>
              <span className="date">
                {new Intl.DateTimeFormat(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(articleQuery.data.article.createdAt))}
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              &nbsp; Follow {articleQuery.data.article.author.username}{" "}
              <span className="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              &nbsp; Favorite Post{" "}
              <span className="counter">
                ({articleQuery.data.article.favoritesCount})
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{articleQuery.data.article.description}</p>
            {articleQuery.data.article.body}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <Link to={`/profile/${articleQuery.data.article.author.username}`}>
              <img src={articleQuery.data.article.author.image} />
            </Link>
            <div className="info">
              <Link
                to={`/profile/${articleQuery.data.article.author.username}`}
                className="author"
              >
                {articleQuery.data.article.author.username}
              </Link>
              <span className="date">
                {new Intl.DateTimeFormat(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(articleQuery.data.article.createdAt))}
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              &nbsp; Follow {articleQuery.data.article.author.username}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            {commentForm}
            {comments}
          </div>
        </div>
      </div>
    </div>
  );
}
