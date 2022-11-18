import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { getHeaders } from "../../../../../../utils/token";
import { articleCommentsQueryKeyFn } from "../../../../../queries/articles/:slug/comments";
import { Article, Comment } from "../../../../../types";
import * as Mutation from "../../../../types";

interface DeleteArticleCommentMutationVariables {
  slug: Article["slug"];
  id: Comment["id"];
}

interface DeleteArticleCommentMutationData {}

function deleteArticleMutationKey() {
  return ["deleteArticleComment"] as const;
}

const deleteArticleCommentMutationFn: Mutation.Fn<
  DeleteArticleCommentMutationData,
  DeleteArticleCommentMutationVariables
> = ({ id, slug }) =>
  fetch(`https://api.realworld.io/api/articles/${slug}/comments/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then((res) => res.json());

export const useDeleteArticleCommentMutation: Mutation.UseFn<
  typeof deleteArticleCommentMutationFn
> = (options) => {
  const queryClient = useQueryClient();
  return useMutation(
    deleteArticleMutationKey(),
    deleteArticleCommentMutationFn,
    {
      onSuccess(...args) {
        const [, variables] = args;
        queryClient.invalidateQueries(
          articleCommentsQueryKeyFn(variables.slug)
        );

        if (options?.onSuccess) {
          options.onSuccess(...args);
        }
      },
    }
  );
};
