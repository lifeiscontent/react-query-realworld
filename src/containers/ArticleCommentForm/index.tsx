import { useCreateArticleCommentMutation } from "../../entities";
import type { User } from "../../entities";

type ArticleCommentFormProps = {
  viewer: User;
  slug: string;
};

export function ArticleCommentForm({ viewer, slug }: ArticleCommentFormProps) {
  const createArticleCommentMutation = useCreateArticleCommentMutation();

  return (
    <form
      className="card comment-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const { currentTarget } = event;
        const body = formData.get("body");
        if (typeof body !== "string") {
          console.log({ body });
          return;
        }
        await createArticleCommentMutation.mutateAsync(
          {
            slug: slug!,
            comment: {
              body,
            },
          },
          {
            onSuccess() {
              currentTarget.reset();
            },
          }
        );
      }}
    >
      <fieldset disabled={createArticleCommentMutation.isLoading}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
            name="body"
          ></textarea>
        </div>
        <div className="card-footer">
          <img src={viewer.image} className="comment-author-img" />
          <button type="submit" className="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </fieldset>
    </form>
  );
}
