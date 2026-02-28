import { postService } from "@shared/api/postService";
import type { Post } from "@shared/index";
import React from "react";
import PostListItem from "./PostListItem";
import Paginator from "./Paginator";

const POSTS_PER_PAGE = 10;

const PostList = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const getPosts = async () => {
      const postList = await postService.list();
      setPosts(postList);
    };

    getPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div>
      <div>
        {currentPosts.map((post) => (
          <PostListItem post={post} key={post.id} />
        ))}
      </div>

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default PostList;
