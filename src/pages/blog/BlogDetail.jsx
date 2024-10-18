import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import "./BlogDetail.css";
import MailList from "../../components/mailList/MailList";

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the route
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/blogs/${id}`); // Fetch blog by ID
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog detail", error);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blogDetailWrapper">
      <div className="blogDetailContainer">
        {/* Blog Header */}
        <div className="blogHeader">
          <img src={blog.thumbnail} alt={blog.name} className="blogImage" />
          <div className="blogTitleContainer">
            <h1 className="blogTitle">{blog.name}</h1>
            <p className="blogDate">Published on October 8, 2024</p>
          </div>
        </div>

        {/* Blog Content */}
        <div className="blogContentContainer">
          <p className="blogContent">{blog.description}</p>
        </div>
      </div>

      <div className="mailListContainer">
        <MailList />
      </div>
    </div>
  );
};

export default BlogDetail;
