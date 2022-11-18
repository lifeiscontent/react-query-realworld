import { useNavigate } from "react-router-dom";
import { useCreateArticleMutation } from "../../entities";

export default function EditorPage() {
  const createArticleMutation = useCreateArticleMutation();
  const navigate = useNavigate();
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const title = formData.get("title");
                const description = formData.get("description");
                const body = formData.get("body");
                const tagList = formData.get("tagList");

                if (
                  typeof title !== "string" ||
                  typeof description !== "string" ||
                  typeof body !== "string" ||
                  typeof tagList !== "string"
                ) {
                  console.log({ title, description, body, tagList });
                  return;
                }

                const result = await createArticleMutation.mutateAsync({
                  article: {
                    title,
                    description,
                    body,
                    tagList: tagList.split(",").map((tag) => tag.trim()),
                  },
                });

                console.log({ result });

                navigate(`/articles/${result.article.slug}`);
              }}
            >
              <fieldset disabled={createArticleMutation.isLoading}>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    name="title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    name="body"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    name="tagList"
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
