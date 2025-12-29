import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  try {
    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:4001/events", event);
    await axios.post("http://localhost:4002/events", event);
    res.send({ status: "OK" });
  } catch (error) {
    console.error("Error forwarding event:", error.message);
  }

  res.send({});
});

const PORT = 4005;
app.listen(PORT, () => {
  console.log(`Event Bus listening on http://localhost:${PORT}`);
});
