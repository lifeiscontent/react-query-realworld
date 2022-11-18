import { useQuery } from "@tanstack/react-query";
import { getHeaders } from "../../../../utils/token";
import { Article } from "../../../types";
import * as Query from "../../types";
export * from "./comments";

function articleQueryKeyFn(slug: string) {
  return ["articles", slug] as const;
}

interface ArticleQueryData {
  article: Article;
}

const articleQueryFn: Query.Fn<ArticleQueryData, typeof articleQueryKeyFn> = ({
  queryKey: [, slug],
}) =>
  fetch(`https://api.realworld.io/api/articles/${slug}`, {
    headers: getHeaders(),
  }).then((res) => res.json());

export const useArticleQuery: Query.UseFn<
  typeof articleQueryFn,
  typeof articleQueryKeyFn
> = (slug, options) =>
  useQuery(articleQueryKeyFn(slug), articleQueryFn, options);
