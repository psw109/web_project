import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postService } from "../services/postService";
import { Post } from "../types/post";

const PostListPage = () => {
  // 게시글 목록을 저장할 state
  const [posts, setPosts] = useState<Post[]>([]);
  // 로딩 상태를 저장할 state
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트가 마운트될 때 게시글 목록을 가져옴
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>게시글 목록</h1>
      <Link to="/posts/create">
        <button>새 게시글 작성</button>
      </Link>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.content.substring(0, 100)}</p>
            <small>
              작성일: {new Date(post.created_at).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostListPage;
