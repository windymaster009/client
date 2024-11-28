import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./BlogDetail.css";
import MailList from "../../components/mailList/MailList";

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL params
  const [blog, setBlog] = useState(null); // Stores the blog details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Adjusted URL to include the full backend API base URL
        const response = await axios.get(`/blogs/${id}`); // Corrected URL with full backend base URL
        
        console.log("Fetched Blog Detail:", response.data); // Log response for debugging

        // Check if response structure is as expected
        if (response.data && response.data._id) {
          setBlog(response.data); // Set blog details from API response
        } else {
          setError("Blog not found"); // If data is not valid, show an error
        }
      } catch (error) {
        setError("Error fetching blog detail"); // Handle errors
        console.error("Error details:", error.response || error.message); // Log error response for debugging
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    };

    fetchBlogDetail(); // Fetch the blog details on component mount
  }, [id]); // Re-fetch when the blog ID changes

  if (loading) return <div>Loading...</div>; // Show loading message
  if (error) return <div>{error}</div>; // Show error message
  if (!blog) return <div>Blog not found</div>; // Show message if blog not found

  return (
    <div className="blogDetailWrapper">
      <div className="blogDetailContainer">
        <div className="blogHeader">
          <img src={blog.thumbnail} alt={blog.name} className="blogImage" />
          <div className="blogTitleContainer">
            <h1 className="blogTitle">{blog.name}</h1>
            <p className="blogDate">
              Published on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="blogContentContainer">
          <p className="blogContent">{blog.description}</p>
          <div className="blogGallery">
            {blog.gallery.split(',').map((imgUrl, index) => (
              <img key={index} src={imgUrl} alt={`Gallery image ${index + 1}`} className="galleryImage" />
            ))}
          </div>
        </div>
      </div>

      <div className="mailListContainer">
        <MailList />
      </div>
    </div>
  );
};

export default BlogDetail;
