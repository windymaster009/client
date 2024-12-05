// src/components/blogSection/BlogSection.jsx
import React from 'react';
import './blogSection.css';


// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Discover the Beauty of Cambodia',
    excerpt: 'Explore the stunning landscapes, rich culture, and vibrant cities of Cambodia in this travel guide.',
    image: 'https://www.kayak.com/rimg/himg/b6/8a/36/expedia_group-389262-43c5af-168823.jpg?width=1366&height=768&crop=true'
  },
  {
    id: 2,
    title: 'Top 11 Places to Visit in Phnom Penh',
    excerpt: 'From historical landmarks to modern attractions, here are the must-see places in Cambodia\'s capital.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVeTlG592qH5OsNLxLEnqThpF8abuITqPEmnXVxM5LHMQBoMK2WfbbpajsZSU7ru4h4yI&usqp=CAU'
  },
  {
    id: 3,
    title: 'A Guide to Cambodian Cuisine',
    excerpt: 'From historical landmarks to modern attractions, here are the must-see places in Cambodia\'s capital.',
    image: 'https://as2.ftcdn.net/v2/jpg/05/28/82/09/1000_F_528820923_D1sHrMTBeDZBm8dYOGrQAZ9lJPmrc37t.jpg'
  }
];

const BlogSection = ({ onViewAllBlogs }) => {
  return (
    <div>
    
      <div className="blogSection">

        <h1 className="blogTitle">Latest Blogs</h1>
        <div className="blogList">
          {blogPosts.map((post) => (
            <div key={post.id} className="blogPost">
              <img src={post.image} alt={post.title} className="blogImage" />
              <h2 className="blogPostTitle">{post.title}</h2>
              <p className="blogPostExcerpt">{post.excerpt}</p>
            </div>
          ))}
        </div>
        <div className="buttonContainer">
          <button className="blogButton" onClick={onViewAllBlogs}>
            View All Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
