import { createWriteStream, type WriteStream } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
export class Logger {
  private logs: { when: string; logs: string; payload?: any }[] = []
  private stream: WriteStream
  private callee: string = ""

  constructor(callee: string, type: "info" | "warn" | "error" = "info") {
    this.stream = createWriteStream(this.getLogFilePath(type), {
      flags: "a",
      encoding: "utf8",
    })
    this.callee = callee
    // * the only way i was able to make this class write at least something to the files
    // process.on("exit", () => {
    //   this.close()
    // })
  }

  private getLogFilePath(type: "info" | "warn" | "error" = "info"): string {
    const importFile = fileURLToPath(import.meta.url)
    const logFileDir = dirname(importFile)
    return join(logFileDir, "../logs", `${type}.log`)
  }

  public log(input: string, payload: any = {}) {
    const timeStamp = new Date().toISOString().split("T")[1].slice(0, -1)
    this.logs.push({ when: timeStamp, logs: input })
    if (Object.keys(payload).length) {
      this.logs[this.logs.length - 1].payload = payload
    }
    console.log("logging", input, payload, this.logs)
  }

  public close() {
    this.logs.forEach((log) => {
      console.log("closing", this.callee, this.logs.length)
      this.stream.write(`${log.when} - [${this.callee}] - info: ${log.logs}\n`)
      if (log.payload) {
        this.stream.write(`payload: ${JSON.stringify(log.payload, null, 2)}\n`)
      }
    })
    this.stream.end()
  }
}

export function wrapLogs(
  callee: string,
  type: "info" | "warn" | "error" = "info"
) {
  return new Logger(callee, type)
}
