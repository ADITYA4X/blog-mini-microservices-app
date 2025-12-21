import React, { useEffect, useState } from "react";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:4000/posts");

      const postsArray = Object.values(res.data);

      setPosts(postsArray);
    };

    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 border border-gray-300 rounded-lg
                     bg-gray-50 hover:bg-gray-100
                     transition duration-200"
        >
          <h3 className="text-lg font-medium text-gray-800">{post.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default PostList;
