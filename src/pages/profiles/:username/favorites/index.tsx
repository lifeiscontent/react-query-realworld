import clsx from "clsx";
import { Link, NavLink, useParams } from "react-router-dom";
import { useProfileQuery, useArticlesQuery } from "../../../../entities";

export default function ProfilesDetailFavoritesPage() {
  const { username } = useParams<"username">();
  const profileQuery = useProfileQuery(username!);
  const articlesQuery = useArticlesQuery({
    favorited: username!,
    limit: 5,
    offset: 0,
  });

  if (profileQuery.isLoading || profileQuery.isError) {
    return null;
  }

  const articles =
    articlesQuery.isLoading || articlesQuery.isError ? (
      <div className="article-preview">Loading...</div>
    ) : articlesQuery.data.articlesCount ? (
      articlesQuery.data.articles.map((article) => (
        <div className="article-preview" key={article.slug}>
          <div className="article-meta">
            <Link to={`/profiles/${article.author.username}`}>
              <img src={article.author.image} />
            </Link>
            <div className="info">
              <Link
                to={`/profiles/${article.author.username}`}
                className="author"
              >
                {article.author.username}
              </Link>
              <span className="date">
                {new Intl.DateTimeFormat(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(article.createdAt))}
              </span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
              <i className="ion-heart" /> {article.favoritesCount}
            </button>
          </div>
          <Link to={`/articles/${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
          </Link>
        </div>
      ))
    ) : (
      <div className="article-preview">No articles are here... yet.</div>
    );

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profileQuery.data.profile.image} className="user-img" />
              <h4>{profileQuery.data.profile.username}</h4>
              <p>{profileQuery.data.profile.bio}</p>
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round" />
                &nbsp; Follow {profileQuery.data.profile.username}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    className={(props) =>
                      clsx("nav-link", {
                        active: props.isActive,
                      })
                    }
                    end
                    to={`/profiles/${username}`}
                  >
                    My Articles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={(props) =>
                      clsx("nav-link", {
                        active: props.isActive,
                      })
                    }
                    end
                    to={`/profiles/${username}/favorites`}
                  >
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>

            {articles}
          </div>
        </div>
      </div>
    </div>
  );
}
