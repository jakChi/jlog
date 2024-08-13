/* eslint-disable react/prop-types */

import Blog from "./Blog";

const BlogList = ({ blogsData, usersData, user, db }) => {
  return (
    <div id="blog-list" className="p-4 w-screen md:w-2/3">
      {blogsData && blogsData.length > 0 ? (
        blogsData.map((blog, i) => (
          <Blog
            text={blog.text}
            name={blog.name}
            createdAt={blog.createdAt}
            author={blog.author}
            authorUid={blog.authorUid}
            currentUser={user}
            users={usersData}
            likes={blog.likes}
            dislikes={blog.dislikes}
            comments={blog.comments}
            key={i}
            db={db}
            docId={blog.docId}
          />
        ))
      ) : (
          <p className="text-gray-500 text-center my-10">Loading data...</p>
      )}
    </div>
  );
};

export default BlogList;
