import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

const port = 4003;

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const moderatedStatus = content.includes("orange")
      ? "rejected"
      : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id,
        content,
        postId,
        status: moderatedStatus,
      },
    });
  }
  res.send({});
});

app.listen(port, () => {
  console.log(`Moderation service is running on http://localhost:${port}`);
});
