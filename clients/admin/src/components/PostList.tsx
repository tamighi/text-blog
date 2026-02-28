import { postService } from "@shared/api/postService";
import type { Post } from "@shared/index";
import React from "react";
import PostListItem from "./PostListItem";

const PostList = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const getPosts = async () => {
      const postList = await postService.list();
      setPosts(postList);
    };

    getPosts();
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
