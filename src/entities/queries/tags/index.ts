import { useQuery } from "@tanstack/react-query";
import { getHeaders } from "../../../utils/token";
import * as Query from "../types";

function tagsQueryKey() {
  return ["tags"] as const;
}

interface TagsQueryData {
  tags: string[];
}

const tagsQueryFn: Query.Fn<TagsQueryData, typeof tagsQueryKey> = () =>
  fetch("https://api.realworld.io/api/tags", {
    headers: getHeaders(),
  }).then((res) => res.json());

export const useTagsQuery: Query.UseFn<
  typeof tagsQueryFn,
  typeof tagsQueryKey
> = (options) => useQuery(tagsQueryKey(), tagsQueryFn, options);
