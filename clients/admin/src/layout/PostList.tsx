import usePosts from "@/hooks/query/usePosts";
import React from "react";
import Paginator from "./Paginator";
import PostItem from "./PostItem";

const POSTS_PER_PAGE = 10;

const PostList = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data: posts = [], isLoading } = usePosts();

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="w-full flex flex-col p-4">
      {isLoading && <div>Loading...</div>}
      <div className="divide-elevation-3 divide-y">
        {currentPosts.map((post) => (
          <PostItem post={post} key={post.id} />
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
