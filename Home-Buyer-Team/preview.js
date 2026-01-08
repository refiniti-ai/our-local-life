const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const notFound = (res) => {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("404 Not Found");
};

const forbidden = (res) => {
  res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("403 Forbidden");
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);

    // Normalize and make sure the path stays inside the project.
    const safePath = path.normalize(path.join(root, pathname));
    if (!safePath.startsWith(root)) {
      return forbidden(res);
    }

    let filePath = safePath;
    const stats = await fs.promises.stat(filePath).catch(() => null);
    if (!stats) {
      return notFound(res);
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    const fileStats = await fs.promises.stat(filePath).catch(() => null);
    if (!fileStats || fileStats.isDirectory()) {
      return notFound(res);
    }

    const ext = path.extname(filePath).toLowerCase();
    const stream = fs.createReadStream(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("500 Internal Server Error");
  }
});

server.listen(0, () => {
  const port = server.address().port;
  const url = `http://localhost:${port}/`;
  console.log(`Preview server running at ${url}`);
  console.log("Press Ctrl+C to stop.");
});

