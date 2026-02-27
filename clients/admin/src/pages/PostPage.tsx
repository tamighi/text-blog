import { postService } from "@shared/api/postService";
import React from "react";

const PostPage = () => {
  React.useEffect(() => {
    const getPosts = async () => {
      const posts = await postService.list();
      console.log(posts);
    };

    getPosts();
  }, []);
  return <div>PostPage</div>;
};

export default PostPage;
