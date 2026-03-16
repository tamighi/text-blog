import Button from "@/components/Button";
import type { Post } from "@shared/index";

type Props = {
  post: Post;
  active: boolean;
};

const PostItemContent = ({ post, active }: Props) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-8">
        <p
          contentEditable={active}
          dangerouslySetInnerHTML={{ __html: post.content }}
          className={`mt-2 text-md text-fg-secondary w-[36vw]
            whitespace-break-spaces ${
              active
                ? "max-h-[75vh] overflow-scroll"
                : "max-h-12 overflow-hidden"
            }`}
        ></p>
        {active && <Button className="self-start">Save</Button>}
      </div>
      <div>Highlights</div>
    </div>
  );
};

export default PostItemContent;
