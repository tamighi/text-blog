import type { Post } from "@shared/index";
import React from "react";
import PostItemContent from "./PostItemContent";
import PostItemHeader from "./PostItemHeader";

type Props = {
  post: Post;
};

const PostItem = ({ post }: Props) => {
  const [active, setActive] = React.useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="py-4 flex flex-col gap-4">
      <PostItemHeader post={post} active={active} onClick={handleClick} />
      <PostItemContent post={post} active={active} />
    </div>
  );
};

export default PostItem;
