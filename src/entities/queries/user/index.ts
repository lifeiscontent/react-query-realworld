import { useQuery } from "@tanstack/react-query";
import { getHeaders } from "../../../utils/token";
import { User } from "../../types";
import * as Query from "../types";

function userQueryKey() {
  return ["user"] as const;
}

type UserQueryData =
  | {
      user: User;
    }
  | { message: string; status: string };

const userQueryFn: Query.Fn<UserQueryData, typeof userQueryKey> = () =>
  fetch("https://api.realworld.io/api/user", {
    headers: getHeaders(),
  }).then((res) => res.json());

export const useUserQuery: Query.UseFn<
  typeof userQueryFn,
  typeof userQueryKey
> = (options) => useQuery(userQueryKey(), userQueryFn, options);
