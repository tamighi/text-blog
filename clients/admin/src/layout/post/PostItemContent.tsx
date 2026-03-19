import Button from "@/components/Button";
import type { Post } from "@shared/index";
import PostItemText from "./PostItemText";

type Props = {
  post: Post;
  active: boolean;
};

const PostItemContent = ({ post, active }: Props) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-8">
        <PostItemText post={post} active={active} />
        {active && <Button className="self-start">Save</Button>}
      </div>
      <div>Highlights</div>
    </div>
  );
};

export default PostItemContent;
