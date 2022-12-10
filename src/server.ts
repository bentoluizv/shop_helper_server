import express from "express";

const PORT = process.env.PORT || 3000;
const server = express();

server.get("/", (req, res) => {
  res.send("Em desenvolvimento!");
});

server.listen(PORT, () =>
  console.log(
    `Server is running on ${PORT}, ${new Date().toLocaleDateString()}`
  )
);
