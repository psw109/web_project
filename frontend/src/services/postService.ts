import api from "./api";
import { Post, CreatePostRequest, UpdatePostRequest } from "../types/post";

export const postService = {
  // 게시글 목록 조회
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>("/posts/");
    return response.data;
  },

  // 게시글 상세 조회
  getPost: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}/`);
    return response.data;
  },

  // 게시글 생성
  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await api.post<Post>("/posts/", data);
    return response.data;
  },

  // 게시글 수정
  updatePost: async (id: number, data: UpdatePostRequest): Promise<Post> => {
    const response = await api.put<Post>(`/posts/${id}/`, data);
    return response.data;
  },

  // 게시글 삭제
  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}/`);
  },
};
