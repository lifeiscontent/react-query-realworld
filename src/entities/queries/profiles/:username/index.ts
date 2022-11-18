import { useQuery } from "@tanstack/react-query";
import { getHeaders } from "../../../../utils/token";
import { Profile } from "../../../types";
import * as Query from "../../types";

function profileQueryKey(username: string) {
  return ["profiles", username] as const;
}

interface ProfileQueryData {
  profile: Profile;
}

const profileQueryFn: Query.Fn<ProfileQueryData, typeof profileQueryKey> = ({
  queryKey: [, username],
}) =>
  fetch(`https://api.realworld.io/api/profiles/${username}`, {
    headers: getHeaders(),
  }).then((res) => res.json());

export const useProfileQuery: Query.UseFn<
  typeof profileQueryFn,
  typeof profileQueryKey
> = (username, options) =>
  useQuery(profileQueryKey(username), profileQueryFn, options);
