import type { Post } from "@shared/index";

type Props = {
  post: Post;
  active: boolean;
};

const PostItemContent = ({ post, active }: Props) => {
  return (
    <div className="flex flex-col gap-4 items-start">
      <p
        contentEditable={active}
        dangerouslySetInnerHTML={{ __html: post.content }}
        className={`mt-2 text-sm text-fg-secondary whitespace-break-spaces ${
          active ? "" : "line-clamp-3"
        }`}
      ></p>
    </div>
  );
};

export default PostItemContent;
