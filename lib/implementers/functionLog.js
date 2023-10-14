// utils/functionLogger.ts
import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
function wrapLogs(callee, type = "info") {
  const logs = [];
  const __importFile = fileURLToPath(import.meta.url);
  const __logFileDir = dirname(__importFile);
  const __logFile = join(__logFileDir, "../logs", `${type}.log`);
  const stream = createWriteStream(__logFile, {
    flags: "a",
    encoding: "utf8"
  });
  return function(input, payload = {}) {
    if (input) {
      const timeStamp = (/* @__PURE__ */ new Date()).toISOString().split("T")[1].slice(0, -1);
      logs.push({ when: timeStamp, logs: input });
      if (Object.keys(payload).length) {
        logs[logs.length - 1].payload = payload;
      }
    }
    return {
      callee,
      logs,
      done: () => {
        logs.forEach((log) => {
          stream.write(`${log.when} - [${callee}] - ${type}: ${log.logs}
`);
          if (log.payload) {
            stream.write(`payload: ${JSON.stringify(log.payload, null, 2)}
`);
          }
        });
        stream.on("finish", () => {
          console.log(`done writing ${type} logs for "${callee}"`);
        });
        stream.end();
      }
    };
  };
}

// implementers/functionLog.ts
function secondary() {
  const log = wrapLogs("secondary log tester");
  log("secondary log tester");
  const error = wrapLogs("secondary log tester", "error");
  error("secondary log tester");
  const warn = wrapLogs("secondary log tester", "warn");
  warn("secondary log tester", { test: "test" });
  log().done();
  error().done();
  warn().done();
  return;
}
function main() {
  const log = wrapLogs("main tester");
  log("log-tester");
  const error = wrapLogs("main tester", "error");
  error("log-tester");
  const warn = wrapLogs("main tester", "warn");
  warn("log-tester 1");
  warn("log-tester 2");
  warn("log-tester 3");
  secondary();
  log().done();
  error().done();
  warn().done();
  return;
}
main();
