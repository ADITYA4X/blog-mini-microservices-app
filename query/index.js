import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 4002;

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "PostDeleted") {
    const { id } = data;

    delete posts[id];
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const post = posts[postId];

    if (post) {
      post.comments.push({ id, content });
    }
  }

  console.log("Current Posts:", posts);

  res.send({});
});

app.listen(port, () => {
  console.log(`Query service is running on http://localhost:${port}`);
});
