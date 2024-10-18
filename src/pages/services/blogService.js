import axios from "axios";

const API_URL = "http://localhost:8800/api/blogs"; // Replace with your backend URL

// Fetch all blogs
export const fetchBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single blog by ID
export const fetchBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new blog
export const createBlog = async (blogData) => {
  const response = await axios.post(API_URL, blogData);
  return response.data;
};

// Update a blog
export const updateBlog = async (id, blogData) => {
  const response = await axios.put(`${API_URL}/${id}`, blogData);
  return response.data;
};

// Delete a blog
export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
