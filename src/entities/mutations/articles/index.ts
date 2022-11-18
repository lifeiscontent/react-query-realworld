import { useMutation } from "@tanstack/react-query";
import { getHeaders } from "../../../utils/token";
import { Article } from "../../types";
import * as Mutation from "../types";
export * from "./:slug";

interface CreateArticleMutationVariables {
  article: Pick<Article, "body" | "description" | "tagList" | "title">;
}

interface CreateArticleMutationData {
  article: Article;
}

function createArticleMutationKey() {
  return ["createArticle"] as const;
}

const createArticleMutationFn: Mutation.Fn<
  CreateArticleMutationData,
  CreateArticleMutationVariables
> = ({ article }) =>
  fetch("https://api.realworld.io/api/articles", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ article }),
  }).then((res) => res.json());

export const useCreateArticleMutation: Mutation.UseFn<
  typeof createArticleMutationFn
> = (options) =>
  useMutation(createArticleMutationKey(), createArticleMutationFn, options);
