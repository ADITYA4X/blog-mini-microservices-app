import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import PostCreate from "./PostCreate";
import CommentList from "./CommentList";

function PostList() {
  const [posts, setPosts] = useState({});
  const [commentRefresh, setCommentRefresh] = useState({});

  const fetchPosts = useCallback(async () => {
    const res = await axios.get("http://localhost:4000/posts");

    setPosts(res.data);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (postId) => {
    await axios.delete(`http://localhost:4000/posts/${postId}`);

    setPosts((prevPosts) => {
      const updatedPosts = { ...prevPosts };
      delete updatedPosts[postId];
      return updatedPosts;
    });
  };

  const triggerCommentRefresh = (postId) => {
    setCommentRefresh((prev) => ({ ...prev, [postId]: Date.now() }));
  };

  return (
    <div className="space-y-6">
      <PostCreate
        onPostCreated={(newPost) =>
          setPosts((prev) => ({ ...prev, [newPost.id]: newPost }))
        }
      />

      <div className="text-center text-gray-600 font-medium">
        {Object.keys(posts).length === 0
          ? "No posts available. Create a new post!"
          : `Total Posts: ${Object.keys(posts).length}`}
      </div>

      <div className="flex flex-row gap-4 flex-wrap justify-center ">
        {Object.values(posts).map((post) => (
          <div
            key={post.id}
            className="p-4 border border-gray-300 rounded-lg
                     bg-gray-50 hover:bg-gray-100
                     transition duration-200 w-full"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">
                {post.title}
              </h3>

              <button
                onClick={() => handleDelete(post.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg
            hover:bg-red-600 transition duration-200
            font-semibold"
              >
                X
              </button>
            </div>
            <CommentCreate
              postId={post.id}
              onCommentCreated={() => triggerCommentRefresh(post.id)}
            />

            <div className="mt-4">
              <CommentList
                postId={post.id}
                refreshSignal={commentRefresh?.[post.id]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
