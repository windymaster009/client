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
        console.log("Fetched Blog Detail:", response.data); // Debugging log
        setBlog(response.data); // Set the fetched blog data
      } catch (error) {
        console.error("Error fetching blog detail", error);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (!blog) return <div>Loading...</div>; // Display loading state

  // gallery is already an array, so we can use it directly
  const galleryImages = Array.isArray(blog.gallery) ? blog.gallery : [];

  return (
    <div className="blogDetailWrapper">
      <div className="blogDetailContainer">
        {/* Blog Header */}
        <div className="blogHeader">
          <img src={blog.thumbnail} alt={blog.name} className="blogImage" />
          <div className="blogTitleContainer">
            <h1 className="blogTitle">{blog.name}</h1>
            <p className="blogDate">
              Published on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Blog Content */}
        <div className="blogContentContainer">
          <p className="blogContent">{blog.description}</p>
        </div>

        {/* Blog Gallery */}
        {galleryImages.length > 0 && (
          <div className="blogGalleryContainer">
            <h2 className="galleryTitle">Gallery</h2>
            <div className="galleryImages">
              {galleryImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Gallery Image ${index + 1}`}
                  className="galleryImage"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mail List */}
      <div className="mailListContainer">
        <MailList />
      </div>
    </div>
  );
};

export default BlogDetail;
