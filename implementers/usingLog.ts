import { wrapLogs } from "../utils/usingLogger.js"
// function secondary() {
//   const log = wrapLogs("secondary log tester")
//   log("secondary log tester")
//   const error = wrapLogs("secondary log tester", "error")
//   error("secondary log tester")
//   const warn = wrapLogs("secondary log tester", "warn")
//   warn("secondary log tester", { test: "test" })
//   return
// }
function main() {
  using log = wrapLogs("main tester")
  log("log-tester")
  using error = wrapLogs("main tester", "error")()
  error("log-tester")
  const warn = wrapLogs("main tester", "warn")
  warn("log-tester 1")
  warn("log-tester 2")
  warn("log-tester 3")
  // secondary()
  return
}
main()
