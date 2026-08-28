/**
 * cPanel / CloudLinux Passenger entry for the Next.js standalone build.
 * Next's generated server.js binds a TCP port, which crashes Passenger
 * (500 on the live site). This listens on the Passenger socket when present.
 */
process.env.NODE_ENV = "production";
process.chdir(__dirname);

if (typeof PhusionPassenger !== "undefined") {
  PhusionPassenger.configure({ autoInstall: false });
}

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || "127.0.0.1";
const app = next({
  dev: false,
  dir: __dirname,
  hostname,
  port,
});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      handle(req, res, parse(req.url, true));
    });

    if (typeof PhusionPassenger !== "undefined") {
      server.listen("passenger", () => {
        console.log("Musasa Next.js ready (Passenger)");
      });
      return;
    }

    server.listen(port, hostname, () => {
      console.log(`Musasa Next.js ready on ${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start Next.js on cPanel:", error);
    process.exit(1);
  });
