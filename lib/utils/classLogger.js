// utils/classLogger.ts
import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
var Logger = class {
  logs = [];
  stream;
  callee = "";
  constructor(callee, type = "info") {
    this.stream = createWriteStream(this.getLogFilePath(type), {
      flags: "a",
      encoding: "utf8"
    });
    this.callee = callee;
  }
  getLogFilePath(type = "info") {
    const importFile = fileURLToPath(import.meta.url);
    const logFileDir = dirname(importFile);
    return join(logFileDir, "../logs", `${type}.log`);
  }
  log(input, payload = {}) {
    const timeStamp = (/* @__PURE__ */ new Date()).toISOString().split("T")[1].slice(0, -1);
    this.logs.push({ when: timeStamp, logs: input });
    if (Object.keys(payload).length) {
      this.logs[this.logs.length - 1].payload = payload;
    }
    console.log("logging", input, payload, this.logs);
  }
  close() {
    this.logs.forEach((log) => {
      console.log("closing", this.callee, this.logs.length);
      this.stream.write(`${log.when} - [${this.callee}] - info: ${log.logs}
`);
      if (log.payload) {
        this.stream.write(`payload: ${JSON.stringify(log.payload, null, 2)}
`);
      }
    });
    this.stream.end();
  }
};
function wrapLogs(callee, type = "info") {
  return new Logger(callee, type);
}
export {
  Logger,
  wrapLogs
};
