import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

const port = 4003;

app.post("/events", async (req, res) => {});

app.listen(port, () => {
  console.log(`Moderation service is running on http://localhost:${port}`);
});
