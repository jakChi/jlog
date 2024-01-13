import { useState } from "react";
import "./App.css";
import CreateNew from "./components/CreateNew";
import Blog from "./components/Blog";

const App = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [blogs, setBlogs] = useState([{}]);

  return (
    <>
      <div id="app-container">
        <nav>
          <header>Jlog</header>
          <div id="nav-buttons">
            <button
              id="create"
              className="btn"
              onClick={() => setShowCreate(true)}
            >
              ახალი ბლოგი
            </button>
          </div>
        </nav>
        <main>
          <CreateNew
            active={showCreate}
            hideComponent={() => setShowCreate(false)}
            sendBlog={(data) => setBlogs([...blogs, data])}
          />
          <div id="blogs">
            {blogs.map((blog, i) => (
              <Blog text={blog.text} name={blog.name} key={i} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
