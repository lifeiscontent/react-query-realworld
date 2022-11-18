import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { getHeaders } from "../../../../../utils/token";
import {
  articleCommentsQueryFn,
  articleCommentsQueryKeyFn,
} from "../../../../../entities/queries/articles/:slug/comments";
import { Article, Comment } from "../../../../types";
import * as Mutation from "../../../types";

interface CreateArticleCommentMutationVariables {
  slug: Article["slug"];
  comment: Pick<Comment, "body">;
}

interface CreateArticleCommentMutationData {
  comment: Comment;
}

function createArticleMutationKey() {
  return ["createArticleComment"] as const;
}

const createArticleCommentMutationFn: Mutation.Fn<
  CreateArticleCommentMutationData,
  CreateArticleCommentMutationVariables
> = ({ comment, slug }) =>
  fetch(`https://api.realworld.io/api/articles/${slug}/comments`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ comment }),
  }).then((res) => res.json());

export const useCreateArticleCommentMutation: Mutation.UseFn<
  typeof createArticleCommentMutationFn
> = (options) => {
  const queryClient = useQueryClient();
  return useMutation(
    createArticleMutationKey(),
    createArticleCommentMutationFn,
    {
      onSuccess(...args) {
        const [data, variables] = args;
        queryClient.setQueriesData<
          Awaited<ReturnType<typeof articleCommentsQueryFn>>
        >(articleCommentsQueryKeyFn(variables.slug), (prev) => {
          if (!prev || !("comments" in prev)) {
            return prev;
          }

          return {
            ...prev,
            comments: [...prev.comments, data.comment],
          };
        });
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
