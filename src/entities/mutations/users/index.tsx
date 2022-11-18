import { useMutation } from "@tanstack/react-query";
import { getHeaders } from "../../../utils/token";
import { User } from "../../types";
export * from "./login";
import * as Mutation from "../types";

interface CreateUserMutationVariables {
  user: Pick<User, "email" | "username"> & { password: string };
}

interface CreateUserMutationData {
  user: User;
}

function createUserMutationKey() {
  return ["createUser"] as const;
}

const createUserMutationFn: Mutation.Fn<
  CreateUserMutationData,
  CreateUserMutationVariables
> = async ({ user }) =>
  fetch("https://api.realworld.io/api/users", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ user }),
  }).then((res) => res.json());

export const useCreateUserMutation: Mutation.UseFn<
  typeof createUserMutationFn
> = (options) =>
  useMutation(createUserMutationKey(), createUserMutationFn, options);
