/* eslint-disable react/prop-types */

import Blog from "./Blog";

const BlogList = ({ blogsData, user, db }) => {
  return (
    <div id="blog-list" className="p-4 w-screen">
      {blogsData && blogsData.length > 0 ? (
        blogsData.map((blog, i) => (
          <Blog
            text={blog.text}
            name={blog.name}
            createdAt={blog.createdAt}
            author={blog.author}
            authorUid={blog.authorUid}
            uid={user.uid}
            likes={blog.likes}
            dislikes={blog.dislikes}
            key={i}
            db={db}
            docId={blog.docId}
          />
        ))
      ) : (
        <p className="text-gray-500">there are no blogs yet!</p>
      )}
    </div>
  );
};

export default BlogList;
