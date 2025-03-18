import express from "express";
import next from "next";
import http from "http";

import "./bot";

const app = next({ dev: false });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server); // Create HTTP server

  // Let Next.js handle all other routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server with both Express and Socket.IO
  httpServer.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
