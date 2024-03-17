/* eslint-disable react/prop-types */

import Blog from "./Blog";

const BlogList = ({ blogsData, user }) => {
  return (
    <div id="blog-list" className="p-4">
      <h1 className="text-3xl font-bold mb-4">ბლოგები</h1>
      {blogsData && blogsData.length > 0 ? (
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
        <p className="text-gray-500">there are no blogs yet!</p>
      )}
    </div>
  );
};

export default BlogList;
