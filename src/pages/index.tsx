import clsx from "clsx";
import React from "react";
import {
  Link,
  resolvePath,
  useHref,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useArticlesQuery, useTagsQuery } from "../entities";

function PaginationItem(props: React.ComponentProps<typeof Link>) {
  const location = useLocation();
  const locationHref = useHref(resolvePath(location));
  const toHref = useHref(props.to);

  return (
    <li
      className={clsx("page-item", {
        active: locationHref === toHref,
      })}
    >
      <Link className="page-link" {...props} />
    </li>
  );
}

export default function FeedPage() {
  const [searchParams] = useSearchParams({ limit: "10", offset: "0" });
  const articlesQuery = useArticlesQuery({
    limit: Number(searchParams.get("limit")),
    offset: Number(searchParams.get("offset")),
    tag: searchParams.get("tag") ?? undefined,
  });

  const tagsQuery = useTagsQuery();

  const articles =
    articlesQuery.isLoading || articlesQuery.isError ? (
      <div className="article-preview">Loading...</div>
    ) : (
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
            <ul className="tag-list">
              {article.tagList.map((tag) => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </Link>
        </div>
      ))
    );

  const pagination =
    articlesQuery.isLoading || articlesQuery.isError ? null : (
      <nav>
        <ul className="pagination">
          <li
            className={clsx("page-item", {
              disabled:
                articlesQuery.data.articlesCount <= 10 ||
                searchParams.get("offset") === "0",
            })}
          >
            <Link
              className="page-link"
              to={{
                pathname: location.pathname,
                search: new URLSearchParams({
                  limit: searchParams.get("limit")!,
                  offset: String(
                    Math.max(
                      0,
                      Number(searchParams.get("offset")!) -
                        Number(searchParams.get("limit")!)
                    )
                  ),
                }).toString(),
              }}
            >
              Prev
            </Link>
          </li>
          {Array.from({
            length: Math.ceil(
              articlesQuery.data.articlesCount /
                Number(searchParams.get("limit")!)
            ),
          }).map((_, i) => (
            <PaginationItem
              key={i}
              to={{
                pathname: location.pathname,
                search: new URLSearchParams({
                  limit: searchParams.get("limit")!,
                  offset: String(i * Number(searchParams.get("limit")!)),
                }).toString(),
              }}
            >
              {i + 1}
            </PaginationItem>
          ))}
          <li
            className={clsx("page-item", {
              disabled:
                Number(searchParams.get("offset")!) +
                  Number(searchParams.get("limit")!) >=
                articlesQuery.data.articlesCount,
            })}
          >
            <Link
              className="page-link"
              to={{
                pathname: location.pathname,
                search: new URLSearchParams({
                  limit: searchParams.get("limit")!,
                  offset: String(
                    Math.min(
                      articlesQuery.data.articlesCount,

                      Number(searchParams.get("limit")!) +
                        Number(searchParams.get("offset")!)
                    )
                  ),
                }).toString(),
              }}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    );

  const tags =
    tagsQuery.isLoading || tagsQuery.isError ? (
      <span className="tag-pill tag-default">loading...</span>
    ) : (
      tagsQuery.data.tags.map((tag) => (
        <Link
          key={tag}
          to={{
            pathname: location.pathname,
            search: new URLSearchParams({
              tag: tag,
            }).toString(),
          }}
          className="tag-pill tag-default"
        >
          {tag}
        </Link>
      ))
    );

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", {
                      active:
                        !searchParams.get("tag") &&
                        location.pathname === "/feed",
                    })}
                    to="/feed"
                  >
                    Your Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", {
                      active:
                        !searchParams.get("tag") && location.pathname === "/",
                    })}
                    to="/"
                  >
                    Global Feed
                  </Link>
                </li>
                {searchParams.get("tag") ? (
                  <li className="nav-item">
                    <Link
                      className={clsx("nav-link", {
                        active: searchParams.get("tag") !== null,
                      })}
                      to={{
                        pathname: location.pathname,
                        search: new URLSearchParams({
                          tag: searchParams.get("tag")!,
                        }).toString(),
                      }}
                    >
                      #{searchParams.get("tag")}
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>

            {articles}
            {pagination}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">{tags}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
