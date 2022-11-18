import { useQuery } from "@tanstack/react-query";
import { getHeaders } from "../../../../../utils/token";
import { Comment } from "../../../../types";
import * as Query from "../../../types";

export const articleCommentsQueryKeyFn = (slug: string) =>
  ["articles", slug, "comments"] as const;

interface ArticleCommentsQueryData {
  comments: Comment[];
}

export const articleCommentsQueryFn: Query.Fn<
  ArticleCommentsQueryData,
  typeof articleCommentsQueryKeyFn
> = ({ queryKey: [, slug] }) =>
  fetch(`https://api.realworld.io/api/articles/${slug}/comments`, {
    headers: getHeaders(),
  }).then((res) => res.json());

export const useArticleCommentsQuery: Query.UseFn<
  typeof articleCommentsQueryFn,
  typeof articleCommentsQueryKeyFn
> = (slug, options) =>
  useQuery(articleCommentsQueryKeyFn(slug), articleCommentsQueryFn, options);
