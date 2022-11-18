import { useMutation } from "@tanstack/react-query";
import { getHeaders } from "../../../utils/token";
import { User } from "../../types";
import * as Mutation from "../types";

interface UpdateUserMutationVariables {
  user: Pick<User, "email" | "image" | "username" | "bio"> & {
    password: string;
  };
}

interface UpdateUserMutationData {
  user: User;
}

function updateUserMutationKey() {
  return ["updateUser"] as const;
}

const updateUserMutationFn: Mutation.Fn<
  UpdateUserMutationData,
  UpdateUserMutationVariables
> = async ({ user }) =>
  fetch("https://api.realworld.io/api/user", {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ user }),
  }).then((res) => res.json());

export const useUpdateUserMutation: Mutation.UseFn<
  typeof updateUserMutationFn
> = (options) =>
  useMutation(updateUserMutationKey(), updateUserMutationFn, options);
