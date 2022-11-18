import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../entities";
import { setToken } from "../../utils/token";

export default function RegisterPage() {
  const createUserMutation = useCreateUserMutation();
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
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
                const username = formData.get("username");
                const email = formData.get("email");
                const password = formData.get("password");
                if (
                  typeof username !== "string" ||
                  typeof email !== "string" ||
                  typeof password !== "string"
                ) {
                  console.log({ username, email, password });
                  return;
                }

                try {
                  const result = await createUserMutation.mutateAsync({
                    user: {
                      username,
                      email,
                      password,
                    },
                  });

                  setToken(result.user.token);
                  navigate("/");
                } catch (err) {
                  console.log({ err });
                }
              }}
            >
              <fieldset
                className="form-group"
                disabled={createUserMutation.isLoading}
              >
                <input
                  name="username"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset
                className="form-group"
                disabled={createUserMutation.isLoading}
              >
                <input
                  name="email"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset
                className="form-group"
                disabled={createUserMutation.isLoading}
              >
                <input
                  name="password"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
