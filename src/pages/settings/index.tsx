import { useNavigate } from "react-router-dom";
import { useUserQuery, useUpdateUserMutation } from "../../entities";

export default function SettingsPage() {
  const userQuery = useUserQuery();
  const updateUserMutation = useUpdateUserMutation();
  const navigate = useNavigate();

  if (userQuery.isLoading || userQuery.isError || !("user" in userQuery.data)) {
    return null;
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                const bio = form.get("bio");
                const image = form.get("image");
                const username = form.get("username");
                const email = form.get("email");
                const password = form.get("password");
                if (
                  typeof bio !== "string" ||
                  typeof image !== "string" ||
                  typeof username !== "string" ||
                  typeof email !== "string" ||
                  typeof password !== "string"
                ) {
                  console.log({ bio, image, username, email, password });
                  return;
                }

                const result = await updateUserMutation.mutateAsync({
                  user: {
                    bio: bio.trim() === "" ? null : bio,
                    image,
                    username,
                    email,
                    password,
                  },
                });

                console.log({ result });

                navigate(`/profiles/${result.user.username}`);
              }}
            >
              <fieldset disabled={updateUserMutation.isLoading}>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    defaultValue={userQuery.data.user.image}
                    name="image"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    defaultValue={userQuery.data.user.username}
                    name="username"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    defaultValue={userQuery.data.user.bio ?? ""}
                    name="bio"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    defaultValue={userQuery.data.user.email}
                    name="email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="password"
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
