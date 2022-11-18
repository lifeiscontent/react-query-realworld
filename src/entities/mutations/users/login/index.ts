import { useMutation } from "@tanstack/react-query";
import { getHeaders } from "../../../../utils/token";
import { User } from "../../../types";
import * as Mutation from "../../types";

interface UserLoginMutationVariables {
  user: Pick<User, "email"> & { password: string };
}

type UserLoginMutationData =
  | {
      user: User;
    }
  | {
      errors: {
        "email or password": string[];
      };
    };

function userLoginMutationKey() {
  return ["userLogin"] as const;
}

const userLoginMutationFn: Mutation.Fn<
  UserLoginMutationData,
  UserLoginMutationVariables
> = async ({ user }) =>
  fetch("https://api.realworld.io/api/users/login", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ user }),
  }).then((res) => res.json());

export const useUserLoginMutation: Mutation.UseFn<
  typeof userLoginMutationFn
> = (options) =>
  useMutation(userLoginMutationKey(), userLoginMutationFn, options);
