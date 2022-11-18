import { Link, useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../../entities";
import { setToken } from "../../utils/token";

export default function LoginPage() {
  const navigate = useNavigate();
  const userLoginMutation = useUserLoginMutation();
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            {false && (
              <ul className="error-messages">
                <li>That email is already taken</li>
              </ul>
            )}
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const email = formData.get("email");
                const password = formData.get("password");
                if (typeof email !== "string" || typeof password !== "string") {
                  console.log({ email, password });
                  return;
                }

                try {
                  const result = await userLoginMutation.mutateAsync({
                    user: {
                      email,
                      password,
                    },
                  });

                  if ("user" in result) {
                    setToken(result.user.token);
                    navigate("/");
                  }

                  console.log({ result });
                } catch (err) {
                  console.log({ err });
                }
              }}
            >
              <fieldset
                className="form-group"
                disabled={userLoginMutation.isLoading}
              >
                <input
                  className="form-control form-control-lg"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset
                className="form-group"
                disabled={userLoginMutation.isLoading}
              >
                <input
                  className="form-control form-control-lg"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
                disabled={userLoginMutation.isLoading}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
