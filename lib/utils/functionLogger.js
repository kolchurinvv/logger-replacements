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
export {
  wrapLogs
};
