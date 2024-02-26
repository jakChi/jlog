/* eslint-disable react/prop-types */

import Blog from "./Blog";

const BlogList = ({ blogsData }) => {
  return (
    <div id="blogs">
      {blogsData.map((blog, i) => (
        <Blog
          text={blog.text}
          name={blog.name}
          createdAt={blog.createdAt}
          author={blog.author}
          key={i}
        />
      ))}
    </div>
  );
};

export default BlogList;
