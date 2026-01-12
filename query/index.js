import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 4002;

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "PostDeleted") {
    const { id } = data;

    delete posts[id];
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    if (post) {
      post.comments.push({ id, content, status });
    }
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    if (post) {
      const comment = post.comments.find((comment) => comment.id === id);
      if (comment) {
        comment.status = status;
        comment.content = content;
      }
    }
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  console.log("Current Posts:", posts);

  res.send({});
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  delete posts[id];
  res.send({});
});

app.listen(port, async () => {
  console.log(`Query service is running on http://localhost:${port}`);

  try {
    const res = await axios.get("http://localhost:4005/events");

    for (let event of res.data) {
      console.log("Processing event:", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.error("Error fetching events:", error.message);
  }
});
