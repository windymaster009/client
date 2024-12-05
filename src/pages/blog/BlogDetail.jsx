import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import "../blog/BlogDetail.css";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Headerbar";

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the route
  const [blog, setBlog] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/blogs/${id}`); // Fetch blog by ID
        console.log("Fetched Blog Detail:", response.data); // Debugging log
        setBlog(response.data); // Set the fetched blog data

        // Fetch the next and previous blog posts
        const prevResponse = await axios.get(`http://localhost:8800/api/blogs/prev/${id}`);
        const nextResponse = await axios.get(`http://localhost:8800/api/blogs/next/${id}`);
        setPrevPost(prevResponse.data);
        setNextPost(nextResponse.data);
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
    <div>
      <Navbar />
      <Header type="list" />
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

          {/* Next and Previous Buttons */}
          <div className="navigationButtons">
            {prevPost && (
              <button
                className="navButton"
                onClick={() => navigate(`/blog/${prevPost._id}`)}
              >
                Back
              </button>
            )}
            {nextPost && (
              <button
                className="navButton"
                onClick={() => navigate(`/blog/${nextPost._id}`)}
              >
                Next
              </button>
            )}
          </div>
        </div>
          <MailList />
      </div>
    </div>
  );
};

export default BlogDetail;
