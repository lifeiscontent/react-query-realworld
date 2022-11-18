import { useQuery } from "@tanstack/react-query";
import { getHeaders } from "../../../../utils/token";
import { Article } from "../../../types";
import * as Query from "../../types";

function articlesFeedQueryKeyFn(params?: {
  limit?: number;
  offset?: number;
  tag?: string;
  author?: string;
  favorited?: string;
}) {
  return ["articles", "feed", params] as const;
}

interface ArticlesFeedQueryData {
  articles: Article[];
  articlesCount: number;
}

const articlesFeedQueryFn: Query.Fn<
  ArticlesFeedQueryData,
  typeof articlesFeedQueryKeyFn
> = ({ queryKey: [, , params] }) =>
  fetch(
    `https://api.realworld.io/api/articles/feed?${new URLSearchParams(
      JSON.parse(JSON.stringify(params))
    )}`,
    {
      headers: getHeaders(),
    }
  ).then((res) => res.json());

export const useArticlesFeedQuery: Query.UseFn<
  typeof articlesFeedQueryFn,
  typeof articlesFeedQueryKeyFn
> = (params, options) =>
  useQuery(articlesFeedQueryKeyFn(params), articlesFeedQueryFn, options);
