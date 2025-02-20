const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"), {
  setHeaders: (res, path, _stat) => {
    if (path.endsWith('.wasm')) {
      res.set("Content-Type", "application/wasm");
    }
  } 
}));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/favicon.ico", (_req, res) => {
  res.status(200);
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
