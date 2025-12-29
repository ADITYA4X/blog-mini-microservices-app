import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2 text-gray-700">Comments</h4>
      {comments?.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-2">
          {comments?.map((comment) => (
            <li
              key={comment.id}
              className="p-2 border border-gray-300 rounded-lg bg-white"
            >
              {comment.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
