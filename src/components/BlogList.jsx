/* eslint-disable react/prop-types */

import Blog from "./Blog";

const BlogList = ({ blogsData, user }) => {
  return (
    <div id="blog-list">
      <h1>ბლოგები</h1>
      {blogsData ? (
        blogsData.map((blog, i) => (
          <Blog
            text={blog.text}
            name={blog.name}
            createdAt={blog.createdAt}
            author={blog.author}
            authorUid={blog.authorUid}
            uid={user.uid}
            key={i}
          />
        ))
      ) : (
        <p>there are no blogs yet!</p>
      )}
    </div>
  );
};

export default BlogList;
