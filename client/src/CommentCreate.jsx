import axios from "axios";
import React, { useState } from "react";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="comment"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            New Comment
          </label>
          <input
            type="text"
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your comment"
            className="w-full rounded-lg border border-gray-300 px-4 py-2
                     focus:outline-none focus:ring-1 focus:ring-blue-500
                     focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg
                   hover:bg-gray-800 transition duration-200
                   font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
