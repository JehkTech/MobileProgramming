require("dotenv").config();
const net = require("net");

const host = process.env.DB_HOST === "localhost" ? "127.0.0.1" : (process.env.DB_HOST || "127.0.0.1");
const port = Number(process.env.DB_PORT || 5432);

const socket = new net.Socket();
socket.setTimeout(5000);

socket.connect(port, host, () => {
  console.log(`DB reachable at ${host}:${port}`);
  socket.destroy();
  process.exit(0);
});

socket.on("timeout", () => {
  console.error(`DB check timeout at ${host}:${port}`);
  socket.destroy();
  process.exit(1);
});

socket.on("error", (error) => {
  console.error(`DB unreachable at ${host}:${port}`);
  console.error(error.message);
  process.exit(1);
});
