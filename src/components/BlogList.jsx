/* eslint-disable react/prop-types */

import Blog from "./Blog";

const BlogList = ({ blogsData, usersData, user, db }) => {
  return (
    <div id="blog-list" className="p-4 w-full">
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
        <>
          <div
            id="blog-skeleton"
            className="dark:bg-gray-900 bg-slate-300 dark:text-white text-black shadow-xl rounded-lg p-2 py-5 md:m-auto md:my-10 my-7 md:p-14 w-full md:w-4/5 h-max container group transition-all duration-400"
          >
            <div className="animate-pulse">
              <h1 className="w-1/3 h-6 rounded-full bg-slate-500/50 mb-5" />
              <div className="mb-10">
                <div className="w-[90%] h-4 my-2 rounded-full bg-slate-500/40" />
                <div className="w-[70%] h-4 my-2 rounded-full bg-slate-500/40" />
              </div>
              <div className="flex justify-between items-center my-5">
                <div className="w-40 md:w-56 h-3 bg-slate-500/30 rounded-full" />
                <div className="w-28 md:w-40 h-3 bg-slate-500/30 rounded-full" />
              </div>
            </div>
          </div>
          <div
            id="ghost-blog"
            className="dark:bg-gray-900 bg-slate-300 dark:text-white text-black shadow-xl rounded-lg p-2 py-5 md:m-auto my-7 md:my-10 md:p-10 w-full md:w-4/5 h-max container group transition-all duration-400"
          >
            <div className="animate-pulse">
              <h1 className="w-1/3 h-6 rounded-full bg-slate-500/50 mb-5" />
              <div className="mb-10">
                <div className="w-[90%] h-4 my-2 rounded-full bg-slate-500/40" />
                <div className="w-[70%] h-4 my-2 rounded-full bg-slate-500/40" />
              </div>
              <div className="flex justify-between items-center my-5">
                <div className="w-40 md:w-56 h-3 bg-slate-500/30 rounded-full" />
                <div className="w-28 md:w-40 h-3 bg-slate-500/30 rounded-full" />
              </div>
            </div>
          </div>

          <p className="text-center">Loading data...</p>
        </>
      )}
    </div>
  );
};

export default BlogList;
