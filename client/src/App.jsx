import React from "react";
import PostCreate from "./PostCreate";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      <div className="max-w-md w-full mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Post
        </h2>
        <PostCreate />
      </div>
    </div>
  );
}

export default App;
