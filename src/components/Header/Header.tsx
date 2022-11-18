import { NavLink, Link } from "react-router-dom";
import { useUserQuery } from "../../entities";

const activeClassName: Exclude<
  React.ComponentProps<typeof NavLink>["className"],
  string
> = (props) => (props.isActive ? "nav-link active" : "nav-link");

export function Header() {
  const userQuery = useUserQuery();
  const nav =
    userQuery.isLoading || userQuery.isError || !("user" in userQuery.data) ? (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <NavLink className={activeClassName} to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={activeClassName} to="/login">
            Sign in
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={activeClassName} to="/register">
            Sign up
          </NavLink>
        </li>
      </ul>
    ) : (
      <ul show-authed="true" className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <NavLink className={activeClassName} to="/">
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className={activeClassName} to="/editor">
            <i className="ion-compose" />
            &nbsp;New Article
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className={activeClassName} to="/settings">
            <i className="ion-gear-a" />
            &nbsp;Settings
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className={activeClassName}
            to={`/profiles/${userQuery.data.user.username}`}
          >
            <img
              className="user-pic"
              src={
                userQuery.data.user.image ??
                "https://api.realworld.io/images/smiley-cyrus.jpeg"
              }
            />
            {userQuery.data.user.username}
          </NavLink>
        </li>
      </ul>
    );
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        {nav}
      </div>
    </nav>
  );
}
