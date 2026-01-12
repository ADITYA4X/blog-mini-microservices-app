import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

const PORT = 4005;

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  try {
    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:4001/events", event);
    await axios.post("http://localhost:4002/events", event);
    await axios.post("http://localhost:4003/events", event);
  } catch (error) {
    console.error("Error forwarding event:", error.message);
  }

  res.send({});
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Event Bus listening on http://localhost:${PORT}`);
});
