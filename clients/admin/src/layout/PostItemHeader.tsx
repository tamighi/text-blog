import Button from "@/components/Button";
import type { Post } from "@shared/index";

type Props = {
  post: Post;
  onClick: () => void;
  active: boolean;
};

const PostItemHeader = ({ post, onClick, active }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-medium cursor-pointer" onClick={onClick}>
        {post.title}
      </h2>
      <span>labels</span>
      {active && <Button>Add label</Button>}
    </div>
  );
};

export default PostItemHeader;
