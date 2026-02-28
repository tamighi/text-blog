import type { Post } from "@shared/index";

type Props = {
  post: Post;
};

const PostListItem = ({ post }: Props) => {
  return <div>{post.title}</div>;
};

export default PostListItem;
