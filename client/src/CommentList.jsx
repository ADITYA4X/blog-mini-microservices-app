import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2 text-gray-700">Comments</h4>
      {comments?.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className=" space-y-2  ">
          {comments?.map((comment) => {
            let content;
            if (comment.status === "approved") {
              content = comment.content;
            } else if (comment.status === "pending") {
              content = "This comment is awaiting moderation";
            } else if (comment.status === "rejected") {
              content = "This comment has been rejected";
            }
            return (
              <li
                key={comment.id}
                className="p-1 border border-gray-400 rounded-md bg-gray-50"
              >
                {content}

                <div>
                  <strong className="text-gray-600">Status:</strong>{" "}
                  <span
                    className={`font-medium ${
                      comment.status === "approved"
                        ? "text-green-600"
                        : comment.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {comment.status.charAt(0).toUpperCase() +
                      comment.status.slice(1)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
