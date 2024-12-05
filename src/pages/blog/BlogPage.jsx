import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Headerbar";
import "./blogPage.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]); // Stores all blogs
  const [currentPage, setCurrentPage] = useState(0); // Tracks current page for pagination
  const blogsPerPage = 3; // Number of blogs per page

  // Truncate description to a specified length
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "  ....... See More"; // Truncate and add ellipsis
    }
    return description;
  };

  // Fetch blogs from the backend API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blogs"); // Corrected URL with backend base URL
        console.log("Fetched Blogs:", response.data); // Log response for debugging
        
        // Adjust the code to handle the response structure { data: Array, paging: {...} }
        const blogsData = response.data.data; // Extracting the 'data' array from the response
        if (Array.isArray(blogsData)) {
          setBlogs(blogsData); // Set the blogs in state if 'data' is an array
        } else {
          setBlogs([]); // If 'data' is not an array, set blogs to empty array
        }
      } catch (error) {
        console.error("Error fetching blogs", error); // Log error for debugging
        setBlogs([]); // Set an empty array if there's an error
      }
    };

    fetchBlogs(); // Call the fetchBlogs function when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Pagination logic
  const startIndex = currentPage * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex); // Get the current blogs based on pagination

  const handleNext = () => {
    if (endIndex < blogs.length) {
      setCurrentPage((prevPage) => prevPage + 1); // Move to the next page
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setCurrentPage((prevPage) => prevPage - 1); // Move to the previous page
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="blogPageContainer">
        <div className="heroSection">
          <img
            src="https://angkorfocus.com/userfiles/travelstyle-Phnom-Penh-Attractions.jpg"
            alt="Hero"
            className="heroImage"
          />
          <div className="heroContent">
            <h1 className="heroTitle">Travel to Explore</h1>
            <p className="heroDescription">
              Explore the world’s best destinations and make your travel dreams come true.
            </p>
            <div className="searchSection">
              <button className="exploreButton">Explore Now</button>
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="blogList">
          {currentBlogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            currentBlogs.map((blog) => (
              <div key={blog._id} className="blogPost">
                <img
                  src={blog.thumbnail}
                  alt={blog.name}
                  className="blogPostImage"
                />
                <h2 className="blogPostTitle">{blog.name}</h2>
                <p className="blogPostDescription">
                  {truncateDescription(blog.description)} {/* Truncate the description */}
                </p>
                <Link to={`/blogs/${blog._id}`} className="readMoreButton">
                  Read More
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Pagination Buttons */}
        <div className="navigationButtons">
          <button
            onClick={handlePrevious}
            disabled={startIndex === 0}
            className="prevButton"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={endIndex >= blogs.length}
            className="nextButton"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
