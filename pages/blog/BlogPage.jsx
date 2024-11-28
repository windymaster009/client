import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import MailList from "../../components/mailList/MailList";
import "./blogPage.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 3;

  // Fetch blogs from the backend API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/blogs"); // API endpoint
        setBlogs(response.data); // Assuming API response is an array of blogs
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  const startIndex = currentPage * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < blogs.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="blogPageContainer">
      <div className="heroSection">
        <img src="https://angkorfocus.com/userfiles/travelstyle-Phnom-Penh-Attractions.jpg" alt="Hero" className="heroImage" />
        <div className="heroContent">
          <h1 className="heroTitle">Travel to Explore</h1>
          <p className="heroDescription">Explore the world’s best destinations and make your travel dreams come true.</p>
          <div className="searchSection">
            <button className="exploreButton">Explore Now</button>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="blogList">
        {currentBlogs.map((blog) => (
          <div key={blog._id} className="blogPost">
            <img src={blog.thumbnail} alt={blog.name} className="blogPostImage" />
            <h2 className="blogPostTitle">{blog.name}</h2>
            <p className="blogPostDescription">{blog.description}</p>
            <Link to={`/blog/${blog._id}`} className="readMoreButton">Read More</Link>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="navigationButtons">
        <button onClick={handlePrevious} disabled={startIndex === 0} className="prevButton">Previous</button>
        <button onClick={handleNext} disabled={endIndex >= blogs.length} className="nextButton">Next</button>
      </div>

      <section style={{ width: "90%", height: "90%", marginTop: "50px" }}>
        <MailList />
      </section>
    </div>
  );
};

export default BlogPage;
