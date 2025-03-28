import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postService } from "../services/postService";
import { Post } from "../types/post";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // 게시글 데이터를 저장할 state
  const [post, setPost] = useState<Post | null>(null);
  // 로딩 상태를 저장할 state
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // 컴포넌트가 마운트될 때 게시글 데이터를 가져옴
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // id가 문자열로 들어오므로 숫자로 변환
        const data = await postService.getPost(Number(id));
        setPost(data);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]); // id가 변경될 때마다 다시 실행

  // 삭제 처리 함수
  const handleDelete = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await postService.deletePost(Number(id));
      navigate("/"); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{post.title}</h1>
      <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "20px" }}>
        작성일: {new Date(post.created_at).toLocaleDateString()}
      </div>
      <div style={{ whiteSpace: "pre-wrap", marginBottom: "20px" }}>
        {post.content}
      </div>

      {/* 버튼 그룹 */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => navigate(`/posts/${id}/edit`)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isDeleting ? "not-allowed" : "pointer",
          }}
        >
          {isDeleting ? "삭제 중..." : "삭제"}
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#808080",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default PostDetailPage;
