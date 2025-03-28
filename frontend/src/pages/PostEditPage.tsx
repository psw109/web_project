import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postService } from "../services/postService";
import { Post } from "../types/post";

const PostEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 기존 게시글 데이터 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(Number(id));
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다:", error);
        alert("게시글을 불러오는데 실패했습니다.");
        navigate(`/posts/${id}`); // 실패시 상세 페이지로 돌아감
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  // 수정 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await postService.updatePost(Number(id), {
        title: title.trim(),
        content: content.trim(),
      });
      navigate(`/posts/${id}`); // 수정 완료 후 상세 페이지로 이동
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>게시글 수정</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="title"
            style={{ display: "block", marginBottom: "5px" }}
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
            }}
            disabled={isSubmitting}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="content"
            style={{ display: "block", marginBottom: "5px" }}
          >
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              height: "200px",
              padding: "8px",
              fontSize: "16px",
            }}
            disabled={isSubmitting}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "수정 중..." : "수정하기"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            disabled={isSubmitting}
            style={{
              padding: "8px 16px",
              backgroundColor: "#808080",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditPage;
