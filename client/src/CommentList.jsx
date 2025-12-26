import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const CommentList = ({ postId, refreshSignal }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  }, [postId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComments();
  }, [fetchComments, refreshSignal]);

  return (
    <div className="mt-4 px-2 border-t border-gray-200">
      {comments.map((comment) => (
        <li key={comment.id} className="p-1 ">
          {comment.content}
        </li>
      ))}
    </div>
  );
};

export default CommentList;
