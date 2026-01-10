import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
const port = 4001;
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: postId,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

// Event handler endpoint
app.post("/events", async (req, res) => {
  console.log("Received Event:", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    if (comment) {
      comment.status = status;
      // Emit CommentUpdated event
      await axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          postId,
          status,
          content,
        },
      });
    }
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`Comments service is running on http://localhost:${port}`);
});
