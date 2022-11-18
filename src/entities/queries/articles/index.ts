import { useQuery } from "@tanstack/react-query";
import { getHeaders } from "../../../utils/token";
import { Article } from "../../types";
import * as Query from "../types";
export * from "./:slug";
export * from "./feed";

function articlesQueryKeyFn(params?: {
  limit?: number;
  offset?: number;
  tag?: string;
  author?: string;
  favorited?: string;
}) {
  return ["articles", params] as const;
}

interface ArticlesQueryData {
  articles: Article[];
  articlesCount: number;
}

const articlesQueryFn: Query.Fn<
  ArticlesQueryData,
  typeof articlesQueryKeyFn
> = ({ queryKey: [, params] }) =>
  fetch(
    `https://api.realworld.io/api/articles?${new URLSearchParams(
      JSON.parse(JSON.stringify(params))
    )}`,
    {
      headers: getHeaders(),
    }
  ).then((res) => res.json());

export const useArticlesQuery: Query.UseFn<
  typeof articlesQueryFn,
  typeof articlesQueryKeyFn
> = (params, options) =>
  useQuery(articlesQueryKeyFn(params), articlesQueryFn, options);
