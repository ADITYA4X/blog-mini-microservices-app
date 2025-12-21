import React, { useState } from "react";
import axios from "axios";

function PostCreate() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Post title:", title);

    // Send a POST request to create a new post
    await axios.post("http://localhost:4000/posts", {
      title,
    });

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-md font-medium text-gray-700 mb-1"
        >
          Title
        </label>

        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
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
  );
}

export default PostCreate;
