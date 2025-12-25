import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";

// Initialize Express app
const app = express();

// Middleware setup for CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// Define the port
const port = 4000;

// In-memory storage for posts
const posts = {};

// Get all posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

// Create a new post
app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

// Delete a post by ID
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  if (!posts[id]) {
    return res.status(404).send({ message: "Post not found" });
  }

  delete posts[id];

  res.status(200).send({ message: "Post deleted successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
