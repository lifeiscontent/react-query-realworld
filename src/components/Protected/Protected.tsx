import { Navigate } from "react-router-dom";
import { useUserQuery } from "../../entities";

export function Protected(props: { children: React.ReactNode }) {
  const userQuery = useUserQuery();
  return userQuery.isLoading ? null : userQuery.isError ? (
    <Navigate to="/" />
  ) : "user" in userQuery.data ? (
    <>{props.children}</>
  ) : (
    <Navigate to="/login" />
  );
}
